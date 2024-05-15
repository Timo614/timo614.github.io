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

The USB Power Delivery Decoy board by WeAct Studio is a great way to get hands on experience with WCH's CH224K IC. This IC allows for voltage to be configured in a few different ways.


<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/level-configuration-mode.webp" alt="CH224K level configuration mode" style="padding: 20px; background-color: #FFF;">

In addition there exists a method by which the configuration is determined via a resistor to ground.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/resistance-configuration-mode.webp" alt="CH224K resistance configuration mode" style="padding: 20px; background-color: #FFF;">

The CH221K also further has an additional method by which a resistor is set for the CFG pin to VDD and the requested voltage is configured according to the manual (I plan on using this in a future board).

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/boards/ch224k/CH221K-voltage-configuration.webp" alt="CH221K voltage configuration" style="padding: 20px; background-color: #FFF;">

I'm a big fan of the development board and have been using them for a bit now even before I ran into the underlying open source schematic. I'd highly suggest grabbing some of the boards for future projects and using the chip for designs going forward. Hoping my own projects with it turn out well.
