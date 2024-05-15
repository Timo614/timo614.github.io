---
title: "CH224K USB Power Delivery Overview"
excerpt: "Look into WCH's CH224K with help from WeAct's CH224K Spoof Board"
date: 2024-05-14T18:55:22-04:00
categories:
  - breakout boards
  - board overviews
tags:
  - Overview
  - CH224K
  - WCH
  - WeAct Studio
  - USB Power Delivery
header:
  teaser: /assets/images/boards/ch224k/teaser.webp
  image: /assets/images/boards/ch224k/overview.webp
  overlay_image: /assets/images/boards/ch224k/header.webp
---

The USB Power Delivery Decoy board by WeAct Studio is a great way to get hands on experience with WCH's CH224K IC. This IC allows for voltage to be configured in a few different ways and the [manual](https://www.wch-ic.com/downloads/CH224DS1_PDF.html) can be referenced for further details (I'll be including select elements of it here in this post).

{% include video id="gndXdZAs1r0" provider="youtube" %}

The WeAct Studio board appears to use the level configuration mode from the manual. The back of the board includes the DIP switch configuration as it does not exactly match the WCH guide as it is mapped differently on the board itself.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/level-configuration-mode.webp" alt="CH224K level configuration mode" style="padding: 20px; background-color: #FFF;">

On the CH224K level configuration mode works by setting some pins to VDD and others to GND. This setup works well with DIP switches as a pin can be held high or low and the DIP switch can be used to optionally configure it accordingly.

There also exists a method by which the configuration is determined via a resistor -- for this mode the manual mentions a setup where you'd have the board set to one voltage and optionally swap out a resistor to configure voltage.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/resistance-configuration-mode.webp" alt="CH224K resistance configuration mode" style="padding: 20px; background-color: #FFF;">

In addition to the CH224K WCH documents a CH221K which is configured via a resistor is set for the CFG pin to VDD. This IC has fewer pins than the CH224K.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/CH221K-voltage-configuration.webp" alt="CH221K voltage configuration" style="padding: 20px; background-color: #FFF;">

For another great example of using the CH224K the [USB Power Delivery Decoy (CH224K)](https://oshwlab.com/wagiminator/ch224k-usb-pd-decoy) board by Stefan Wagner uses this chip in a similar manner. I've included the relevant section of Stefan's schematic from the associated link below for reference.
<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/stefan-wagner-ch224k-relevant-schematic-section.webp" alt="Stefan Wagner's CH224K PD Relevant Schematic Section" style="padding: 20px; background-color: #FFF;">

As you can see in his board the CH224K has the CFG pins pulled to VDD via 10K resistors. When the DIP switch is enabled for the pins they are pulled to GND. As such his pin diagram is the opposite of the manual (to explain why the DIP switch doesn't mimic the manual).

I'm a big fan of these development boards and have been using them for a bit now. I'd highly suggest grabbing some of the boards for future projects and using the chip for designs going forward. Hoping my own projects with it turn out well.
