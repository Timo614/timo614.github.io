---
title: "3D Printed Animal Tracks"
excerpt: "Approach to 3D Printed Animal Track Tags"
date: 2024-06-30T22:36:00-04:00
categories:
  - 3d-printing
tags:
  - Project
  - 3D Printing
header:
  teaser: /assets/images/projects/3d-print/animal-tags/teaser.webp
  image: /assets/images/projects/3d-print/animal-tags/overview.webp
  overlay_image: /assets/images/projects/3d-print/animal-tags/overview.webp
gallery:
  - url: /assets/images/projects/3d-print/animal-tags/makes-gallery-1.webp
    image_path: /assets/images/projects/3d-print/animal-tags/makes-gallery-1.webp
    alt: "Animal Tag Make Gallery 1"
    title: "Animal Tag Make Gallery 1"
  - url: /assets/images/projects/3d-print/animal-tags/makes-gallery-2.webp
    image_path: /assets/images/projects/3d-print/animal-tags/makes-gallery-2.webp
    alt: "Animal Tag Make Gallery 2"
    title: "Animal Tag Make Gallery 2"
  - url: /assets/images/projects/3d-print/animal-tags/makes-gallery-3.webp
    image_path: /assets/images/projects/3d-print/animal-tags/makes-gallery-3.webp
    alt: "Animal Tag Make Gallery 3"
    title: "Animal Tag Make Gallery 3"
---

This guide explains the process to create the animal tags I [added on Printables](https://www.printables.com/model/926922). The idea behind these tags is that one can utilize them in the wilds to compare to tracks they find.

{% include video id="dzBPHl5JeFw" provider="youtube" %}

## Steps to Create

### Image Aqusition, Cleanup, and SVG Preparation

In the case of animal prints government websites are often a great source of information as there are several that compile track data for use of residents. Massachusetts, for example, [provides an animal tracks information page](https://www.mass.gov/news/get-to-know-animal-tracks). This was the one I primarily used for the project. For the below example and in my video [I used one from Kentuky](https://fw.ky.gov/More/Documents/trackidguide[1].pdf).  

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/field-guide.webp" alt="Field Guide" style="padding: 20px; background-color: #FFF;">

Taking a single track (the Elk) from the field guide:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/precleaned-up.webp" alt="Precleaned up Elk Track" style="padding: 20px; background-color: #FFF;">

After cleaning in [GIMP](https://www.gimp.org/) (a free image editor) removing the marks outside of the track:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/cleaned-up.webp" alt="Cleaned up Elk Track" style="padding: 20px; background-color: #FFF;">

With the cleaned up image we can take it to [EZGif's PNG to SVG tool](https://ezgif.com/png-to-svg) to convert it:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/ezgif-png-to-svg.webp" alt="EZGif PNG to SVG" style="padding: 20px; background-color: #FFF;">

After selecting options to better convert it:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/ezgif-conversion.webp" alt="EZGif Configuration" style="padding: 20px; background-color: #FFF;">

After downloading the SVG we'll switch to Fusion 360.

### Fusion 360

With Fusion 360 there is a [personal edition](https://www.autodesk.com/products/fusion-360/personal) which gives you a chance to learn the tooling if the following applies to you:

> Autodesk Fusion for personal use is a limited, free version that includes basic functionality for qualifying users who generate less than $1,000 USD in annual revenue and use for home-based, non-commercial projects only.

For this part of the project we'll utilize the fusion 360 tooling to imprint the animal track into the 3D model and also to emboss text into the tag.

For the purposes of this guide the starting point is the blank animal tag:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/fusion-blank.webp" alt="Fusion 360 Blank Tag" style="padding: 20px; background-color: #FFF;">

Once inside of the tool, in the Solid menu there's the option to create a sketch. Once in the sketch view you can select the surface of the print and add sketch related elements.

From the insert menu there's the option to "Insert SVG":

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/fusion-insert-menu.webp" alt="Insert SVG in Fusion 360" style="padding: 20px; background-color: #FFF;">

With the SVG inserted you can scale and position it as needed until it's in the proper location for extrusion. Once there click the button to finish the sketch you can then select the surfaces to extrude.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/fusion-sketch-select.webp" alt="Fusion 360 Sketch Selection" style="padding: 20px; background-color: #FFF;">

With a suitable distance set for extrusion you can cut into the surface:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/fusion-extrusion-cut.webp" alt="Fusion 360 Cut Surface" style="padding: 20px; background-color: #FFF;">

The next step, if trying to emulate my design, is to create a sketch again and use the create text option to type out additional information for printing:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/fusion-add-text.webp" alt="Fusion 360 Add Text" style="padding: 20px; background-color: #FFF;">

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/fusion-text.webp" alt="Fusion 360 Text" style="padding: 20px; background-color: #FFF;">

For my own settings I used a 0.75mm extrusion for the text:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/fusion-extrude-text-join.webp" alt="Fusion 360 Extrude Text" style="padding: 20px; background-color: #FFF;">

Finally with Fusion 360 you'll need to export the model for printing:

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/fusion-3d-print.webp" alt="Fusion 360 Print" style="padding: 20px; background-color: #FFF;">

### Prusaslicer

With the model exported for printing it can imported into [Prusaslicer](https://help.prusa3d.com/article/download-prusaslicer_2220) for printing (or any other similar software).

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/prusa-import.webp" alt="Prusaslicer Import" style="padding: 20px; background-color: #FFF;">

If you want a similar effect with the color change I did you can add a color change to the print. With my i3 MK3S the firmware pauses at this point and begins beeping alerting me to perform the change.

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/projects/3d-print/animal-tags/prusa-color-change.webp" alt="Prusaslicer Color Change" style="padding: 20px; background-color: #FFF;">

Once that is complete you can print the model. I think they turned out well.

{% include gallery id="gallery" class="full" caption="Printed Animal Tags" %}

## Closing Thoughts

This approach works well for black and white images. I think having 3D printed objects also helps people visualize how the tracks look and it gives a great way to compare while out in the wild.