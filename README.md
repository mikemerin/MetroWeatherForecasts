![Main](https://imgur.com/hEMyY77)

# Metro Weather Forecasts

This application is meant solely to help Metro Weather create forecasts and deposit them into forms, which will then be sent to their LIFT clients and others. The first 6 pages are for LIFT forms and the last page is for TIDES, with a FREE page to dynamically create forecasts for any location, mainly for use with TV/film/radio clients.

The LIFT forms are valid for the day of, and the TIDES will point to the next Sunday (or the current Sunday if you're doing it the day of).

# Important Note

Please note: the API that this application connects to has a limit of 750 calls per day, and because the application connects to all 6 LIFT forecast stations it makes 21 calls (two for each of the 6 forecast stations (one for the table, one for the graph), and one for each of the 9 tide stations), meaning this application can be used 35 times a day. Not too big of a deal, but please don't spam it.

This is meant to be a base forecast; please do research on your own to fine-tune the forecasts as you see fit.

# Website

[Link](https://metroweatherforms.herokuapp.com/)

# Instructions

Use Chrome and download this extension:

https://chrome.google.com/webstore/detail/copytables/ekdpkppgmlalfkphpibadldikjimijon/related?hl=en

Once you do that, you can simply right-click on the table and choose "copy table".

Open up the word document and highlight all cells (or for Tides, highlight all but the wind/wave/visibility column), then right-click to paste and voila!
