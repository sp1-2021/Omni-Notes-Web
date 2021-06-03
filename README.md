## Omni Notes Web Editor

Simple web application for note taking aimed to have both a simple interface but keeping smart behavior.
The web editor supports synchronization with your **Google Drive**, which makes it possible to use the application via a web browser and a mobile version.

You can find original repository with mobile app [here](https://github.com/federicoiosue/Omni-Notes).

### Goals and features

The main purpose of the application was to create a web editor that was able to synchronize with the google drive, which allowed editing and creating notes in both the web application and the mobile application (which was specially modified [here](https://github.com/sp1-2021/Omni-Notes)).

* Authentication through a Google account and sync your notes to the cloud,
* Reading, creating, modifying and deleting notes,
* I18n support.

Additional features:
* Support for attachments and archiving notes,
* Searching for notes,
* Categorizing and tagging notes.


### Maintainers / Contributors

* [Michał Bar](https://github.com/MrPumpking)
* [Maciej Ładoś](https://github.com/macieklad)
* [Kamil Woźnik](https://github.com/Valaraucoo)

### Run Development

To run the application in your development environment you need to set it in the `.env` file Google API credentials.:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Then you can start the development server:

```
yarn dev
```

To be able to use full synchronization with the mobile application, do not forget to run [our modified Omni-Notes](https://github.com/sp1-2021/Omni-Notes) mobile application on your mobile device.


### License
GPL-3.0 License
