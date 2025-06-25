---
title: "Glowbug Mini - Mini USB PD based WLED controller"
excerpt: "Small Size PCB design with a WLED controller board"
date: 2025-06-24T14:01:00-04:00
categories:
  - pcb
tags:
  - Project
  - WLED
  - ESP32S3
  - WS2812
  - Lights
  - PCBWay
header:
  teaser: /assets/images/projects/pcb/glowbug-mini/teaser.webp
  image: /assets/images/projects/pcb/glowbug-mini/overview.webp
  overlay_image: /assets/images/projects/pcb/glowbug-mini/overview.webp
---

Glowbug Mini is a new WLED control board with USB power delivery and CH224K powered 5V 2A output

[Project Link](https://oshwlab.com/timo6141/light-buddy_copy)

{% include video id="euuNeTG7BHU" provider="youtube" %}

Like my Glowbug Project this PCB is designed to use [WLED](https://kno.wled.ge/) a firmware that works on many Espressif microcontrollers to handle LED effects and control. WLED is fairly extensible with various usermods to handle things like audioreactive light displays, OLED screen output, and so on. This particular PCB is setup to be small form factor but still have the main elements of a fully featured WLED PCB like a fuse, large capacitor, relay, and in addition uses a WCH 224K to allow for 5V 2A power delivery via the attached USB input.
I've [previously discussed](https://www.cranberrygrape.com/breakout%20boards/board%20overviews/ch224k-usb-power-delivery-overview/) the CH224K so opted to go that direction.

This smaller board has the following features:
- USB power delivery power
- Uses a relay to keep power consumption in check
- Uses a fuse to prevent issues
- Capacitor for the LED line
- 3 or 4 wire support for LED strips
- Level shifting the data and clock lines
- IR receiver

In this article I'll be discussing the schematic for my board, [linking the project on EasyEDA](https://oshwlab.com/timo6141/light-buddy_copy) for the associated board, and demonstrating it in practice.

**Careful:** Use this board at your own peril. Things seem to be working for me but further testing is warranted before anyone uses it in a production setting.
{: .notice--danger}

## Project Sponsorship

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/sponsors/PCBWay.webp" alt="PCBWay" style="padding: 20px; background-color: #FFF;">

At this time I want to thank PCBWay for sponsoring this project by providing the PCBs. I'm grateful they put faith in my project and gave me this opportunity. Their [website](https://www.pcbway.com/) can be accessed for more details about their product line. I like how easy it was to go from my gerber to the shipped product and the boards I received seem of high quality. Their [capabilities page](https://www.pcbway.com/capabilities.html) has a lot information about what they can help you with. PCBWay really does make it easy to get started, build professional PCBs for your project, and see your ideas come to fruition. Love it.

## Schematic rundown

The entire schematic can be referenced from the EasyEDA project directly or via the [associated PDF linked here]({{ site.url }}{{ site.baseurl }}/assets/images/projects/pcb/glowbug-mini/Schematic_Glowbug-Mini.pdf). 

### Power

This PCB includes a WCH CH224K used for USB PD. As mentioned previously I was grateful to have used this IC a few times prior with WeAct boards I grabbed on aliexpress so I had a decent idea of its capabilities. I took a look over at the [WCH documentation for CH224K](https://www.wch-ic.com/downloads/CH224DS1_PDF.html) and from there adjusted my schematic. 

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/pcb/glowbug-pd-1.1/ch224-power.webp" alt="CH224K Power" style="padding: 20px; background-color: #FFF;">

This is a fragment of the WCH CH224K documentation linked above. As you can see in this configuration mode one can adjust the resistance of the given pins to request different voltage levels. 

### WLED configuration

In WLED you can further configure the device. For the ESP32S3 I utilized platform.io with the wled firmware and selected the 4M qspi environment. 

Here I've selected several GPIO for the various elements such as the IR receiver and relay. These correspond to the values printed on the PCB itself for reference and ease of access. I used the pinout of the Xiao ESP32S3 to find the associated GPIO to use.