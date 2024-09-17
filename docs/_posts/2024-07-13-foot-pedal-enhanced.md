---
title: "Foot Pedal Enhanced"
excerpt: "Enhancing a foot pedal for microcontroller use"
date: 2024-07-13T12:30:00-04:00
categories:
  - mini-projects
tags:
  - Project
  - Electronic Reuse
  - Seeed Studio
header:
  teaser: /assets/images/projects/seeed/foot-pedal-enhanced/teaser.webp
  image: /assets/images/projects/seeed/foot-pedal-enhanced/overview.webp
  overlay_image: /assets/images/projects/seeed/foot-pedal-enhanced/overview.webp
---

For this project I've modified a [pcsensor FS2020U1 USB Foot Switch Control device](https://s.click.aliexpress.com/e/_Dma95rN) from aliexpress a bit back (from a different seller) to work with my microcontroller for use in various projects.

{% include video id="37s4px8k248" provider="youtube" %}

Printables link: [https://www.printables.com/model/941756-foot-pedal-adapter](https://www.printables.com/model/941756-foot-pedal-adapter)

Additional Project items (affiliate links):
- [Xiao SAMD21](https://www.seeedstudio.com/Seeeduino-XIAO-Arduino-Microcontroller-SAMD21-Cortex-M0+-p-4426.html?sensecap_affiliate=vkN9MXE&referring_service=link)
- [pcsensor FS2020U1 USB Foot Switch Control device](https://s.click.aliexpress.com/e/_Dma95rN)
- [22 Gauge 5 Conductor Electrical Wire](https://amzn.to/4cDorwm)

## Background

Awhile back I purchased this foot pedal from Aliexpress as a way to add an additional control device to my set of random devices. A big driving factor was that I know it'll make for a great component to use with future videos so I wanted to do the legwork to get this piece in place ahead of a need.

## Initial investigations

I removed the screws from the device's bottom and began investigating the layout of the circuit board. Upon opening it was clear the circuit is a simple IR emitter and receiver (versus a mechanical switch). The mechanism for signaling in this case was to break that emitter's line of sight to the receiver with a piece of plastic that falls into the cutout between them as the spring is compressed down by a foot.

My initial investigations of the board left me fairly puzzled. I could see each of the boards was the same. I could also see the power lines were connected.

{% include video id="-hLTz7C-poc" provider="youtube" %}

Initially I was going to use the existing wires coming from the board but realized it powered the sensor by doing a round-robin power setup powering one signal pin at a time while checking the state of the others (using a reverse biased diode to power the board from the main board). This worked well during my testing (setting one pin as power and checking the state of the pedals) but wasn't feasible for the microcontroller to source that much current from the signal pins. This falstad circuit shows power from the [left signal wire](https://www.falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKAC9wAWTkFPPXvl79eIACZ0AZgEMArgBsALgzZ0AdnQBOLADIgGeKnwEGqYPlHAgZ8gM51qkFgHdBA425Cc4UFgGNPbzNCKiDLMFh4KOi4MEZyTmhOFEwEDGJsQkIwQjwM8EiYoriGDBYAcy4eTmwUKq9DSydNerCwbhBcHjMol0CfNAEauqccurBiOuHW2tEJGQVleToxKyp12FZXduqfHa9Z5sDZianDkFynbY6Pfa7fV0HhdxEPK68BkU5Gt77sTOenQB9yOYWm2Dw1XOlz+ALC-0IBxGLDGnUhSKBiOmdXmciUDGWqwg6ygmz6YJ8YMOLBaCI+VDpIOQ8AqmIxdO+JKcAQpDIQUx8ZkKRWiJQSSRSGDSGSyOTyPAiIuK8XJnyGlMF7DZHjCHhxUjxylUGm0AFltSI6eYBEZoAg+nrXiJiIj3h4XQ0qB73pyQB7fb8Wo6BPc3synLZOpAeB46WGIDZ7DTwCF6a1BaSoqRsznc6Rk9h+WmORmYFm8xX8y0PbdzICenAWJHmHVbjcRGZrNI7HQ+vs2zGEK6+oQY87EYH9KO06Y0xty5W8039C3AbP412e8mmBYPEw6-GWa5px7p79XDuBKeeN6+pe19a-cPzf2h-VH7b7Rx1yImBPXuIBqLCo6haHeOQPlimoBH+M7TmEQpKjEYpeBKqTpJk2QkEIipIVEYqsrO0xEY06zbo0YSzkyYC9BeEGUfR1KogwszERRsz6gs+KEmsTRkheFE+ER1ItLBxGsdChh3j8v6NCC4H-gIZ4diON6ItO07vBpY5Kd0DoiMpV7DkAA), [from the middle signal wire](https://www.falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKAC9wAWTkFPPXvl79eIACZ0AZgEMArgBsALgzZ0AdnQBOLADJceKBIX3gwKKOBAz5AZzrVILAO6CBfN0M5woLAMauQLyowQiogizBYeGiYuDBGck5oThQwfAI+DDxITkJzSNjCuISWAHMTTmx87kDsi0dNCu8wGtweYOjnAPC0AUrzRxD84nN+iqrRCRkFZXk6MUsqJdhWFxaecPXAiYbuibAR7YGQQmyurfcTNp8XXuE3EUvHFx6RTjqnruxsY0vv42uu3CY2weA2OxOZxc-0C3hhY0GeRAoPB5nhE3MUzkSgYcwWECWUBWXWB3mBOxYjXhcJ+yJyEU65XRaNp70Jjn8pKo2AQo28wSiRRi8QYiWSqXSKEy2Vy2HAgqF8BFGBJ3kuXJ8HBh6rVj3EUmxylUGm0AFlkbS-rSzAIqChoAgupdnSJiMZnvcQG7alRvR62V7jAHPo0XQJrk9kHAWDY6QYRNqRMErNJbHRKeBQrDgjVwstoqRC0Xi6QMzy+dzWfyiQWS3XS41vZdmOZI2lo7GW56LknLNY7Ocas2h0Ybid4wIm0mMwxCBtvAw6nma-B6-WYyAmGZPYu7b2qP3040mHwd122-AunPA+PPR6T5PjNe-V0H2fTy-zbud3UbRZ7Y6HDfpcTC-HqWIzCo6haK+IRnkG-J+JucHhLO86EgUirRMqgTimk-BSngWQ5CQ8pYdhJTlN+YzUXUSwzkuC51ICUbRi4oHZshQYUkMm4TDRS4Yvq0w4niiz1MS7GMVQ1EUseKETAw-EQqc94fCI36ArBYECNenwuM+T48NeHrXnpIgmU6FkTjejhAA) and [from the right signal wire](https://www.falstad.com/circuit/circuitjs.html?ctz=CQAgjCAMB0l3BWcMBMcUHYMGZIA4UA2ATmIxAUgoqoQFMBaMMAKAC9wAWTkFPPXvl79eIACZ0AZgEMArgBsALgzZ0AdnQBOLADIhs2QsIEGjYPlHAgZ8gM51qkFgHdBAvu6Gc4UFgGM3EG8qMEIqYMswWHgY2LgwRnJOaE4wYk4MMEgwTOJsMggouOL4xJYAcy4eTmwUKqC8KiaWTXqIsG59SB4QmJdAiLQBGrqnULq0upG22tEJGQVleToxKyaoWFZXDuqfHaDZp1ahg4niKcOQQkb+-Y963B7+k-vXkSdXQZFORuNfV1Mf0Bj18rQi02weGql2uH30hiCPkB0zGhDqkOh6IR0zq8zkSgYy1WEHWMGy-XBPnBhxa8KMEWB3UifUqyNmyN+zQClKo2AQUx8IWiJViCQYSRSaQyWRyaXymXAwpF8DFGApPnuPN8HEBmo1IlxUnxylUGm0AFl6igEGZOsxRrxoAhngbXQJiEY4fcPQ0qD64T8-fTfvcjn97iDQ8g4CxbF0eBGEVGIDZ7LTQuE9p0Ik0laR8wXC6RaXyBbzsYKNjEizX87Sffd7X9ejG403G50o1RU3Rbp2RHcbf8rgmRA33rSGIRdlQGL8c1X4LXa7GQExzH851Qu9ZpHZe60mBZ7uu6sn4P1pyAfVfQ-0j+6jFf-ffzO4RA-r56WJat5vfm+lgoE67BriGH6hOG4hGosKjqFor5GCekE5v4a4oT4U4zpESrKtkiRBJK6SZNkuTyoUuHKqqFRgeEsx-oGlhhgxmG-CCLYxq4TD0phKE0uMa6zNMDGzIaCwEkSaxMZs97zqxdGjJOfF1AwQkwjcXHgQIf7sYhfy3hOrjPk+PBXnCV4GQIZkulZo6Pr4QA) illustrates a similar circuit setup as the one used by the controller with the 4 wire approach. One of the pins as a power source with the other two acting as an open collector. This approach does work as shown above but it could present a problem for a microcontroller without additional components as the pins wouldn't be able to source enough current without use of a mosfet for each signal line (albeit one could just use two pins for power).

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/seeed/foot-pedal-enhanced/foot-pedal-open.webp" alt="Foot Pedal With Enclosure Open" style="padding: 20px; background-color: #FFF;">

Luckily, the main board still surfaced the power pin though (each of the side boards is a duplicate of the main) so I realized I could easily replace the wire with a [5 wire one I grabbed from Amazon](https://amzn.to/4cDorwm) and be able to use this with my projects going forward.

## Wire strain relief component

The original setup used an injection molded piece around the 4 wire cable. This helped to provide strain relief for the wire keeping it from being dislodged from the circuit board. This also unfortunately meant the existing piece would need to be replaced completely. I measured the existing part, adjusted the design slightly, and printed a component.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/seeed/foot-pedal-enhanced/foot-pedal-existing-part.webp" alt="Foot Pedal Existing Part" style="padding: 20px; background-color: #FFF;">

My original design actually didn't work here but involved using a PG-7 cable gland for preventing cable movement. The problem related to the top component of the foot pedal as it has a plastic piece which comes rather low. The PG-7, even at the bottom of the replacement piece, just was too high in the piece with its backing nut so it couldn't be inserted without modifying the pedal shell which I did not want to do here.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/seeed/foot-pedal-enhanced/foot-pedal-replacement-part-original.webp" alt="Foot Pedal Replacement" style="padding: 20px; background-color: #FFF;">

As a result I [designed a replacement piece](https://www.printables.com/model/941756-foot-pedal-adapter) that was much simpler and only had the wire going through versus any additional hardware. To aid with wire strain I added holes for a zip tie which can be used to keep the wire from moving.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/seeed/foot-pedal-enhanced/foot-pedal-replacement-part-complete.webp" alt="Foot Pedal Replacement Complete" style="padding: 20px; background-color: #FFF;">

## Wire attachment

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/seeed/foot-pedal-enhanced/tinned-wires.webp" alt="Tinned Wires" style="padding: 20px; background-color: #FFF;">

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/seeed/foot-pedal-enhanced/dupont-connectors.webp" alt="Dupont Connectors Attached" style="padding: 20px; background-color: #FFF;">

I tinned and soldered the wires to the main board, used a zip tie, and crimped the stripped wires on the other end of the board for use with a dupont connector. 

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/seeed/foot-pedal-enhanced/soldered-wires-with-zip-tie-strain-relief.webp" alt="Soldered Wires with Zip Tie Strain Relief" style="padding: 20px; background-color: #FFF;">

At this point the device is ready for use with a microcontroller.

## Microcontroller use

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/seeed/foot-pedal-enhanced/xiao-samd21-connected.webp" alt="Microcontroller Connected" style="padding: 20px; background-color: #FFF;">

Now with the 5 wires soldered and with dupont connectors on the other side it's easy to get running with a sketch. I connected the red wire to 3V3, black to GND, and used D0-D2 as signal wires.

The code for the logic used in my example is rather simple as well:

```c++
#include "Keyboard.h"

const int leftPin = D0;
const int middlePin = D1;
const int rightPin = D2;

void setup() {
  Serial.begin(9600);
  
  pinMode(leftPin, INPUT_PULLUP);
  pinMode(middlePin, INPUT_PULLUP);
  pinMode(rightPin, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(leftPin) == LOW) {
    Keyboard.press('a');
  } else {
    Keyboard.release('a');
  }

  if (digitalRead(middlePin) == LOW) {
    Keyboard.press('w');
  } else {
    Keyboard.release('w');
  }

  if ( digitalRead(rightPin) == LOW) {
    Keyboard.press('d');
  } else {
    Keyboard.release('d');
  }
  
  delay(100);
}
```

The pins are set to inputs with a pullup. The loop logic simply checks if the pins are reading `LOW` indicating that the pedal has been pressed down causing the blocker to interfere with the emitter / receiver setup. Once brought `LOW` the logic emulates the pressing of the `awd` keys (used with `awsd` control schemes to move forward and turn or strafe).

## Testing

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/seeed/foot-pedal-enhanced/foot-pedal-low-resolution.gif" alt="Foot pedal playing game" style="padding: 20px; background-color: #FFF;">

With the circuit in place I opted to test the functionality with the game [Rebel Galaxy](https://www.gog.com/en/game/rebel_galaxy). In this game the `a` and `d` correspond with turning while the `w` is used for the booster throttle.

## Concluding thoughts

This was a neat project that puzzled me for a bit. I definitely felt accomplished figuring out the unique round robin power used here with the initial circuit. 

I'd like to design my own foot pedal in the future using a mechanical switch instead of the line break used here. Not sure if I'd reuse the enclosure here or 3D print my own but worth a revisit some day. For now this seems great and I'll be using this for some projects I have planned.