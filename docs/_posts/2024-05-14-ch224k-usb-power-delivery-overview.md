---
title: "CH224K USB Power Delivery Overview"
excerpt: "Look into WCH's CH224K with help from Stefan Wagner's CH224K USB PD spoof board"
date: 2024-05-14T18:55:22-04:00
categories:
  - breakout boards
  - board overviews
tags:
  - Overview
  - CH224K
  - WCH
  - Stefan Wagner
  - USB Power Delivery
header:
  teaser: /assets/images/boards/ch224k/teaser.webp
  image: /assets/images/boards/ch224k/overview.webp
  overlay_image: /assets/images/boards/ch224k/header.webp
---

The [USB Power Delivery Decoy (CH224K)](https://oshwlab.com/wagiminator/ch224k-usb-pd-decoy) board by Stefan Wagner is a great way to get hands on experience with WCH's CH224K IC. This IC allows for voltage to be configured in a few different ways.

{% include video id="23r1LA2b9to" provider="youtube" %}

For the board Stefan made he uses the "5.2.2 Level configuration mode" mentioned in the [manual](https://www.wch-ic.com/downloads/CH224DS1_PDF.html).

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/stefan-wagner-ch224k-relevant-schematic-section.webp" alt="Stefan Wagner's CH224K PD Relevant Schematic Section" style="padding: 20px; background-color: #FFF;">

I've included the relevant elements of his schematic above. As you can see from the IC's connection he uses the DIP switch to configure whether or not the pins are either driven to VDD via a 10K resistor or driven to GND. There are three pins for the DIP switch as there are 3 CFG pins which correspond with the various states. For Stefan's diagram it's the opposite values from the manual with regard to the DIP switch as he defaults to driving the CFG pins to VDD and then uses the DIP switches to drive them to GND.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/level-configuration-mode.webp" alt="CH224K level configuration mode" style="padding: 20px; background-color: #FFF;">

In addition there exists a method by which the configuration is determined via a resistor to ground.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/resistance-configuration-mode.webp" alt="CH224K resistance configuration mode" style="padding: 20px; background-color: #FFF;">

The CH221K also further has an additional method by which a resistor is set for the CFG pin to VDD and the requested voltage is configured according to the manual (I plan on using this in a future board).

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/CH221K-voltage-configuration.webp" alt="CH221K voltage configuration" style="padding: 20px; background-color: #FFF;">

I'm a big fan of the development board and have been using them for a bit now even before I ran into the underlying open source schematic. I'd highly suggest grabbing some of the boards for future projects and using the chip for designs going forward. Hoping my own projects with it turn out well.
