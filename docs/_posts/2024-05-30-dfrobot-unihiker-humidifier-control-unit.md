---
title: "DFRobot Unihiker Humidifier Control Unit"
excerpt: "DFRobot Unihiker Humidifier Control Unit"
date: 2024-05-30T14:41:00-04:00
categories:
  - mini-projects
tags:
  - Project
  - DFRobot
  - Unihiker
  - Humidifier
header:
  teaser: /assets/images/projects/dfrobot/unihiker/humidifier/teaser.webp
  image: /assets/images/projects/dfrobot/unihiker/humidifier/overview.webp
  overlay_image: /assets/images/projects/dfrobot/unihiker/humidifier/overview.webp
---

[Unihiker](https://www.unihiker.com/) is a single board computer from [DFRobot](https://www.dfrobot.com/). The Unihiker runs a customized version of Debian and provides a "Pinpong" library to interface with the various GPIO. They also provide several sensor libraries they're already ported.

For this project I'll be controlling an LED ring, interfacing with the onboard buttons and light sensor, and using i2c to communicate with a SHT31 temperature and humidity sensor.
The code for this project can be found [here](https://github.com/Cosmic-Bee/unihiker_humidifier).

{% include video id="5krdgD6bSHs" provider="youtube" %}

## Background

I had the pleasure of trying out the DFRobot Unihiker as part of the [Unihiker trial](https://community.dfrobot.com/contest-1040.html). Thank you DFRobot for sponsoring this project through the trial program!

I also recently picked up a Seeed Water Atomization module. Atomization modules are a key element to many interesting projects. For example, run the atomization module then shine a red LED and suddenly you have pretend flames (my child's fake grill has this feature), use it with a pumpkin at halloween for spookey ambiance, or even just use it as a humidity generator for a grow room environment.

## Function

For the humidifier I opted to keep the functionality as simple as possible. I did persist the night light feature from my other Unihiker project. Please see the video for a detailed view of the device in use.

The unit is limited to:
- Enabling and disabling the humidify function in general
- Set point keeping for humidity level
- A touchscreen control unit for adjusting that set point and monitoring the state

In addition given I wanted to utilize the Unihiker more heavily and it felt like a useful "bonus" I've included on the display the Unihiker's temperature and humidity as well as the end humidifier's values. In this way you could keep the main unit by a nightstand and then the humidifier locked away nearby and check how the humidity is affected across the environment.

**Careful:** For the purposes of this demonstration many of the electronics are exposed. In a real deployment situation it would be advisable to seal the electronics in an enclosure and use cable grommets to prevent the humidity from affecting the components. Take heed and protect your electronics.
{: .notice--danger}

## 3D Printed Stand

To aid with this project I created a [simple 3D printed stand](https://www.printables.com/model/894852-unihiker-stand). It has a slot for the micro:bit connector for the Unihiker to slide down into and then a back piece to brace it. I didn't require any supports to print it and used little infill. Seems to balance fine from my testing. There are 28 mm between the two holes for the LED ring and it uses m2 screws to connect.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/dfrobot/unihiker/scale/unihiker-stand.webp" alt="CH224K level configuration mode" style="padding: 20px; background-color: #FFF;">

## Code

To set this up properly you will need to prepare both the Xiao and the Unihiker and their associated components.

### Xiao ESP32S3

The Xiao ESP32S3 has a few elements hooked up here to get the entire project working.

The primary elements are as followed:
- Of course a [Xiao ESP32S3](https://wiki.seeedstudio.com/xiao_esp32s3_getting_started/)
- A [Grove Base for Xiao](https://www.seeedstudio.com/Grove-Shield-for-Seeeduino-XIAO-p-4621.html) - optional but the HY2.0 4P connectors make setup fairly easy
- A [Grove DHT11 Temperature and Humidity Sensor](https://wiki.seeedstudio.com/Grove-TemperatureAndHumidity_Sensor/)
- A [Grove 4 Digit Display](https://wiki.seeedstudio.com/Grove-4-Digit_Display/)
- A [Grove Water Atomization Module](https://wiki.seeedstudio.com/Grove-Water_Atomization/)
- A [Bidirectional Level Shifter](https://www.sparkfun.com/products/12009)

Let's get started with the setup, from here it's actually not too bad outside of the level shifter and even that is fairly simple.

First connect the DHT11 via its Grove cable to the connector with the D0 as the outer pin. Given the DHT11 is a 1 wire interface you can see the Seeed folks set the other pin to NC meaning it's not connected and can be ignored.

Next connect the 4 digit display. It's connected to the Grove connector that shows D1 and D2 as the available signal pins. The D1 from the last connector is repeated here but it's safe to use as we didn't attach anything to D1 with the last connection per the NC.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/dfrobot/unihiker/humidifier/grove-expansion-connections.webp" alt="CH224K level configuration mode" style="padding: 20px; background-color: #FFF;">

With this setup we only need to connect the atomization module. I find having a couple Grove to Dupont cables helps for this step as it allows me to still rely on the connectors for the end devices. For my own use I relied on two of these [conversion cables](https://www.seeedstudio.com/Grove-4-pin-Male-Jumper-to-Grove-4-pin-Conversion-Cable-5-PCs-per-Pack.html) along with some dupont male to male cables.

On the Xiao Grove Expansion board it's possible to solder male or female pins to be able to use dupont cables directly from a pin. In this way I soldered female headers and used that male dupont cable to connect to the VBUS for the high voltage. From the VBUS pin I connected directly to HV pin on the level shifter.

With the HV setup you can then use the Grove to dupont cable connector, attach the red pin (3v3) to the LV pin on the level shifter. Attach the black pin to the common ground of your breadboard. Use dupont cables to then attach that common ground to the gnd inputs on the level shifter. Like the DHT11 the Atomization module only uses one signal wire so the additional wire can be plugged into an unused port on the breadboard to be kept out of the way. Connect the signal wire to one of the LV1-LV4 inputs. For the other Grove to dupont cable connect the NC signal wire to a random location, the signal wire to the corresponding HV# to the one you used (ie HV1 if you selected LV1), the red wire to the HV pin, and the black wire to the common GND.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/dfrobot/unihiker/humidifier/level-shift.webp" alt="CH224K level configuration mode" style="padding: 20px; background-color: #FFF;">

In this way you will have setup the humidifier circuit. The screen is used for displaying the humidity, the DHT11 is used to return the humidity and temperature to ESPHome, and the atomization module is used for creating humidity.

Note: I'm not responsible if you destroy your electronics with humidity. I'd heavily suggest using an enclosure with a wire grommet and keeping your electronics away from moisture where possible.

For setup you'll need to go through the [normal ESPHome procedures for install](https://esphome.io/guides/getting_started_hassio.html). On my local machine I use the CLI to install the initial program and use my Home Assistant install to update OTA.

### DFRobot Unihiker

The Unihiker here is fairly straightforward to setup as it's only relying on a few components.

I opted to [use my stand with built in ringlight](https://www.printables.com/model/894852-unihiker-stand) for this project. The STL for 3D printing is available on printables if interested. It's a super simple stand for the Unihiker with a slot for the Micro:Bit connector, a backing piece to support the device which leaves the connectors free for use, and a ringlight for 8 LEDs for "night mode."

Here I had only a minimal set of components:
- A [DFRobot Unihiker](https://www.unihiker.com/)
- A [Grove SHT31 Temperature and Humidity Module](https://wiki.seeedstudio.com/Grove-TempAndHumi_Sensor-SHT31/)
- A 8 LED ring with 28mm screw spacing (unfortunately not sure on my source for this one, just had on hand)

I soldered a SMD connector to the LED ring allowing me to connect it directly to the Unihiker. To do this I confirmed the pin orientation out of the Unihiker and positioned the connector such that the same pins would connect to the cable.

The SHT31 I connected via a Grove to dupont cable connection followed by a similar cable connecting back to the Unihiker port i2c port. Seeed and DFRobot use different pinouts for their i2c so pay attention to the signal wires to ensure the SDA and SCL are properly connected.

For installation you can follow the normal [getting started procedures](https://www.unihiker.com/wiki/get-started). For my own setup I used VSCode remote SSH extension they discuss allowing access to the filesystem. To install the script in my case I simply created a `unihiker_humidifier.py` script at the root. From there you can run programs, find the script, and run it to enable this logic. I like in a sense how this makes the Unihiker versatile for running all sorts of applications.

