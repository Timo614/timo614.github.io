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

In addition there exists a method by which the configuration is determined via a resistor to ground.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/resistance-configuration-mode.webp" alt="CH224K resistance configuration mode" style="padding: 20px; background-color: #FFF;">

The CH221K also further has an additional method by which a resistor is set for the CFG pin to VDD and the requested voltage is configured according to the manual (I plan on using this in a future board).

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/CH221K-voltage-configuration.webp" alt="CH221K voltage configuration" style="padding: 20px; background-color: #FFF;">

In addition to the WeAct board the [USB Power Delivery Decoy (CH224K)](https://oshwlab.com/wagiminator/ch224k-usb-pd-decoy) board by Stefan Wagner uses this chip in a similar manner and should also be referenced. I've included the relevant section of Stefan's schematic from the associated link below for further reference.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/stefan-wagner-ch224k-relevant-schematic-section.webp" alt="Stefan Wagner's CH224K PD Relevant Schematic Section" style="padding: 20px; background-color: #FFF;">

As you can see in his board the CH224K has the CFG pins pulled to VDD via 10K resistors. When the DIP switch is enabled for the pins they are pulled to GND. As such his pin diagram is the opposite of the manual (to explain why the DIP switch doesn't mimic the manual).

I'm a big fan of these development boards and have been using them for a bit now. I'd highly suggest grabbing some of the boards for future projects and using the chip for designs going forward. Hoping my own projects with it turn out well.
