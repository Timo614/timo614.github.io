---
title: "Robot Car With Gravity Offline Voice Recognition"
excerpt: "Adeept Omni-Directional Mecanum Car Kit x DFRobot Gravity Offline Voice Recognition Module"
date: 2024-06-20T11:41:00-04:00
categories:
  - mini-projects
tags:
  - Project
  - Adeept
  - Robotics
  - Banana Pi PicoW S3
  - Robot Car
  - Offline Voice Recognition Module
  - DFRobot
header:
  teaser: /assets/images/projects/dfrobot/voice-recognition-module/car-control/teaser.webp
  image: /assets/images/projects/dfrobot/voice-recognition-module/car-control/overview.webp
  overlay_image: /assets/images/projects/dfrobot/voice-recognition-module/car-control/overview.webp
---

For this project I'm utilizing [DFRobot Offline Voice Recognition module (affiliate link)](https://www.dfrobot.com/product-2665.html?tracking=Abxl41KH0gYXMiwPMWR8KfrR2xHcVGPklsPZMCdpxU6kcAylDPqgIkd9tpqCto1b) as the control mechanism for the [Adeept Omni-directional Mecanum Wheels car kit](https://www.adeept.com/adeept-4wd-omni-directional-mecanum-wheels-robotic-car-kit-for-esp32-s3-banana-pi-picow-s3-diy-stem-remote-controlled-educational-robot-kit_p0406_s0086.html). 

{% include video id="BExq-ssUYSE" provider="youtube" %}

## Prerequisites

For more information about the robot car kit you can check my [article on the lessons from the Adeept tutorials with the car](https://www.cranberrygrape.com/mini-projects/adeept-omni-car/).

This guide assumes the existing control libraries from the Adeept code bundle exist on the CircuitPython drive and that the robot has been properly configured and tested.

## Code

The first step to getting this working is to [download the CircuitPython library for the DFRobot Offline Voice Recognition module](https://github.com/Timo614/DFRobot_DF2301Q/blob/timo614-circuitpython/python/circuitpython/DFRobot_DF2301Q.py) and its associated [commands file](https://github.com/Timo614/DFRobot_DF2301Q/blob/timo614-circuitpython/python/circuitpython/DFRobot_DF2301Q_Commands.py) and place them in the root of the CircuitPython drive. For this project I ported over the existing Python library which was fairly straightforward (note: I wasn't using UART for this so didn't support it in the port).

Some changes are also required of the provided `BPI_PicoW_S3_Car.py`:

```py
class LCD1602:
    def __init__(self, i2c):
        self.i2c = i2c
        self.lcd = LCD(I2CPCF8574Interface(self.i2c, 0X27), num_rows=2, num_cols=16)
    
    def clear(self):
        self.lcd.clear()

    def print(self, string):
        self.lcd.print(string)

    def cleanup(self):
        self.I2C.deinit()
```

The reason for this the logic here previously initiated the i2c bus and we now need to do that in the `main.py` file for the DFRobot offline voice recognition module. 

In addition this [gist](https://gist.github.com/Timo614/ff64dcbae994308eb0a2c67bfcb982e4) contains the source code for the `main.py` file used for this project.

Let's go over the associated code to understand why it works:

```py
import time
import board
import busio
import wifi
import socketpool
import ipaddress
import avoid_obstacles
import keep_distance
import line_tracking
from BPI_PicoW_S3_Car import Motor, Servo, I2CPCF8574Interface, LCD, LCD1602
from DFRobot_DF2301Q import DFRobot_DF2301Q_I2C, DF2301Q_I2C_ADDR
from DFRobot_DF2301Q_Commands import CommandWord
import neopixel
import pwmio
```
First we import the associated libraries. Some of these come with CircuitPython and are available immediately without additional included libraries. Others like the DFRobot_DF2301Q we included as an additional library on the device itself and it's found as part of this.

```py
# Initialize I2C bus
i2c = busio.I2C(board.GP21, board.GP20)
DF2301Q = DFRobot_DF2301Q_I2C(i2c, i2c_addr=DF2301Q_I2C_ADDR)
```
We're initializing the I2C bus here using pins GP21 (SCL) and GP20 (SDA) and setting up the DFRobot DF2301Q (Gravity Offline Voice Recognition module) on it.

```py
# WS2812 LED strip setup
NUM_PIXELS = 4
pixels = neopixel.NeoPixel(board.GP11, NUM_PIXELS)
```
With that set we initialize 4 NeoPixels on pin GP11 (the four onboard LEDs -- in addition they have an extension where you can attach additional neopixels and could update here to reflect that).

```py
# Motor and Servo setup
speed_low = 40
servo = Servo()
motor = Motor()
```
Preparing the motor and servo.

```py
# Buzzer setup
class Buzzer:
    def __init__(self):
        self._buzzer = pwmio.PWMOut(board.GP26, duty_cycle=0, frequency=440, variable_frequency=True)

    def playtone(self, frequency):
        self._buzzer.duty_cycle = 65535 // 2  # Half-full duty ratio
        self._buzzer.frequency = frequency

    def sound(self):
        self.playtone(1500)

    def bequiet(self):
        self._buzzer.duty_cycle = 0  # Empty duty cycle

buzzer = Buzzer()
```
Setting up the buzzer for playing a tone on command.

```py
# Wi-Fi setup
ssid, pw = ('BPI-PicoW-S3', '12345678')
wifi.radio.start_ap(ssid=ssid, password=pw)
time.sleep(1)
print(f'WiFi AP mode Started! SSID is {ssid}, IP={wifi.radio.ipv4_address_ap}')

pool = socketpool.SocketPool(wifi.radio)
BUFF_SIZE = 1024
```
Initializing the WIFI access point.

```py
# LCD setup
lcd = LCD1602(i2c)
lcd.print("Initializing...")
time.sleep(1)
lcd.clear()
``` 

Initializes the LCD and quickly displays a message indicating current state before clearing it.

```py
# Brightness variable
brightness = 0.5

# RGB color array
rgb_color = [255, 255, 255]  # Default to white
```
A variable to represent brightness and one to hold the values for red, green, and blue.

```py
# Function to set pixel color with brightness adjustment
def update_neopixel():
    adjusted_color = tuple(int(c * brightness) for c in rgb_color)
    pixels.fill(adjusted_color)

# Function to update RGB color
def update_rgb_color(r, g, b):
    global rgb_color
    rgb_color = [r, g, b]
    update_neopixel()
```
I've added these two methods to help with the color logic. The former method multiplies the brightness value by the current RGB colors to find the resulting dimmed color. It then fills the neopixels with this color setting them all to it.

The latter method is used when setting the RGB color. It caches this value when the color is changed. In this way we can allow the robot to respond to requests around adjusting brightness without losing track of the underlying color.

```py
# Function to handle voice commands
def handle_voice_command(CMDID):
    global brightness
    command_name = ""

    if CMDID == CommandWord.GoForward:
        motor.move(1, 'forward', speed_low)
        command_name = "Go Forward"
    elif CMDID == CommandWord.Retreat:
        motor.move(1, 'backward', speed_low)
        command_name = "Retreat"
    elif CMDID == CommandWord.ParkACar:
        motor.motor_stop()
        command_name = "Park a Car"
    elif CMDID == CommandWord.TurnOnTheLight:
        update_rgb_color(255, 255, 255)
        command_name = "Turn On The Light"
    elif CMDID == CommandWord.TurnOffTheLight:
        update_rgb_color(0, 0, 0)
        command_name = "Turn Off The Light"
    elif CMDID == CommandWord.BrightenTheLight:
        if brightness < 1.0:
            brightness += 0.1
        update_neopixel()
        command_name = "Brighten The Light"
    elif CMDID == CommandWord.DimTheLight:
        if brightness > 0.0:
            brightness -= 0.1
        update_neopixel()
        command_name = "Dim The Light"
    elif CMDID == CommandWord.SetToRed:
        update_rgb_color(255, 0, 0)
        command_name = "Set To Red"
    elif CMDID == CommandWord.SetToOrange:
        update_rgb_color(255, 165, 0)
        command_name = "Set To Orange"
    elif CMDID == CommandWord.SetToYellow:
        update_rgb_color(255, 255, 0)
        command_name = "Set To Yellow"
    elif CMDID == CommandWord.SetToGreen:
        update_rgb_color(0, 255, 0)
        command_name = "Set To Green"
    elif CMDID == CommandWord.SetToCyan:
        update_rgb_color(0, 255, 255)
        command_name = "Set To Cyan"
    elif CMDID == CommandWord.SetToBlue:
        update_rgb_color(0, 0, 255)
        command_name = "Set To Blue"
    elif CMDID == CommandWord.SetToPurple:
        update_rgb_color(128, 0, 128)
        command_name = "Set To Purple"
    elif CMDID == CommandWord.SetToWhite:
        update_rgb_color(255, 255, 255)
        command_name = "Set To White"
    elif CMDID == CommandWord.Reset: 
        servo.set_angle(board.GP7, 0)
        command_name = "Set Servo To 0 Degrees"
    elif CMDID == CommandWord.SetServoToTenDegrees: 
        servo.set_angle(board.GP7, 10)
        command_name = "Set Servo To 10 Degrees"
    elif CMDID == CommandWord.SetServoToThirtyDegrees:  
        servo.set_angle(board.GP7, 30)
        command_name = "Set Servo To 30 Degrees"
    elif CMDID == CommandWord.SetServoToFortyFiveDegrees:  
        servo.set_angle(board.GP7, 45)
        command_name = "Set Servo To 45 Degrees"
    elif CMDID == CommandWord.SetServoToSixtyDegrees:  
        servo.set_angle(board.GP7, 60)
        command_name = "Set Servo To 60 Degrees"
    elif CMDID == CommandWord.SetServoToNinetyDegrees:  
        servo.set_angle(board.GP7, 90)
        command_name = "Set Servo To 90 Degrees"
    elif CMDID == CommandWord.TurnOnTheBuzzer:  
        buzzer.sound()
        command_name = "Turn On The Buzzer"
    elif CMDID == CommandWord.TurnOffTheBuzzer:  
        buzzer.bequiet()
        command_name = "Turn Off The Buzzer"

    if command_name:
        lcd.clear()
        lcd.print(command_name)
```
This logic is the underlying control code for the robot. Here I am just checking against a subset of the commands. 

```py
def setup():
    DF2301Q.set_volume(15)
    DF2301Q.set_wake_time(20)
```
Here some initial values are set on the module making it loud enough to hear and setting the wake time to 20 seconds.

```py
def loop():
    CMDID = DF2301Q.get_CMDID()
    if CMDID != 0:
        print("CMDID = %u\n" % CMDID)
        handle_voice_command(CMDID)
    time.sleep(1)

if __name__ == "__main__":
    setup()
    while True:
        loop()
```
This last piece is the main loop of the program. After the initial setup it proceeds to check the DFRobot module each second looking for a spoken command. If one is not found it sleeps and checks again on the next iteration.

So not that complex of a project demonstration but an effective control scheme for the robot. My kids had a lot of fun yelling "Go forward!", "Retreat!", "Park a car!", and fighting over control of the color selection.
