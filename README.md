# Metro Weather Forecasts

This application is meant solely to help Metro Weather create forecasts and deposit them into forms, which will then be sent to their LIFT clients and others. The first 7 tabs are for LIFT forms and the last tab is for TIDES, with a FREE tab to dynamically create forecasts for any location, mainly for use with TV/film/radio clients. The application will switch to a Winter form during the correct seasons, though you can toggle between normal and Winter freely.

![Main](https://imgur.com/hEMyY77.png)

---

Graphs are also generated and can be directly copied and pasted into emails.

![Graph](https://imgur.com/bFHtHhZ.png)

---

The LIFT forms are valid for the day of, and the TIDES will point to the next Sunday (or the current Sunday if you're doing it the day of).

![Tides](https://imgur.com/PZCV9I5.png)

---

Using the FREE tab You can enter a zip code, city and state, or city and province/country and it will give you a formatted forecast. You can click the metric checkbox to output additional temperatures in Celcius and winds in KPH, useful for when forcasting clients in Canada, Mexico, or elsewhere.

![Free](https://imgur.com/9BeQJx9.png)

---

# Important Note

Please note: the API that this application connects to has a limit of 750 calls per day, and because the application connects to all 7 LIFT forecast stations it makes 23 calls (two for each of the 6 forecast stations (one for the table, one for the graph), and one for each of the 9 tide stations), meaning this application can be used 35 times a day. Not too big of a deal, but please don't spam it.

This is meant to be a base forecast; please do research on your own to fine-tune the forecasts as you see fit.

# Website

[Link](https://metroweatherforms.herokuapp.com/)

# Instructions

Use Chrome and download this extension:

https://chrome.google.com/webstore/detail/copytables/ekdpkppgmlalfkphpibadldikjimijon/related?hl=en

Once you do that, you can simply right-click on the table and choose "copy table".

Open up the word document and highlight all cells (or for Tides, highlight all but the wind/wave/visibility column), then right-click to paste and voila!
