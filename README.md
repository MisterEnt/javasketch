Second big 'assignment' for The Odin Project, which was to create an 'etch-a-sketch' of sorts using JavaScript and jQuery. The grid area needed to have a fixed length and width, but the user needed to be able to resize the pixels in the grid. Mouse-over was the change the pixel somehow.

-Grid initializes with a 16 x 16 pixel grid.

-Running mouse over grid pixels changes their opacity to 0. The grid is white, and site background is black, hence the grid pixels change from white to black.

-Red button "reset grid" does just that, allowing users to specify the number of pixels on a side (up to 200, although even 100 runs too slowly. Perhaps someday I will try to optimize it to work much more efficiently but maybe it's not possible to do with jQuery? I'm sure checking for events on 40,000 <div>s is an absurd thing to do, so maybe making it work well is impossible? Dunno. Noob for now. Works well enough below about 80 per side, though!)

-Blue button toggles "party mode", which changes the way the grid is used. Instead of fading opacity, the background color changes to a random hex color. Mousing over already blacked-out grid spaces does nothing, so you can outline a picture and then party color it in.

-All and all a good project that only took a couple days. A lot of frustration with the particulars of jQuery (which I've never used before), but that's to be expected.

