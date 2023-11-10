# Frequently Asked Questions

#### Q: How do I set up a provider (for HttpClient)?

**A:**  If you are using standalone components, including standalone bootstrapping to launch your application, pull in the HTTPClient service provider as part of the application configuration. That's in the app.config.ts file.

If you are using NgModules to bootstrap the application instead, import HttpClientModule into the AppModule. In the app.module.ts file, add HttpClientModule to the imports array.

**Demo:** [Here is the link to the location in the course that demonstrates setting up a provider.](https://app.pluralsight.com/course-player?clipId=b7e13b5c-64d2-4404-ac38-c6f8a4b221ad&startTime=25.829)
