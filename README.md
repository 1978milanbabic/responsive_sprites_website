# Framework creation tool
# Node website (ejs) for responsive sprites framework

*Security information has been transferred to a separate folder / module that is not versioned*


## Site link: [http://responsive-sprites.com/](http://responsive-sprites.com/)

----------


### The Goal:

 > The idea was to apply an existing my own well-tested framework [responsive_sprites_framework](http://responsive-sprites.com/) that controls sprites images in a way that makes them much more precise in positioning and showing them. This framework also has the ability to create responsive images from sprites images. The implementation of the images itself irresistibly resembles the popular font-awesome, and is therefore very simple and practical. The most complicated part of the implementation of existing framework was the creation of sprites images, as well as the object representing its data / data on individual thumbnails, and therefore a site was created that significantly facilitates and accelerates this process
 ----------


### About the site - functionality:

 >  - Due to the uploading of images in order to avoid the "conflict" of multiple visitors, it is necessary for each visitor to create an account and separate the space, that is, the folder in which the upload will be made, as well as the capture of the created sprites of the picture and the information about it
 >  - Registration of new users is done by sending a registration link to the mail of the potential user, which he / she has to confirm / visit to activate the account
 >  - New registers are archived in the mongoDB database, where the data: user name, selected code, link to activate the account, and whether the account is activated
 >  - Sessions are avoided due to a number of technical shortcomings, and instead of them, sessions are controlled by cookies that during each visit and every activity on any page extend for half an hour. Cookies contain information about the name of the user, as well as the current activity on creating sprites and details related to it, and therefore serve as a link between individual pages. Key data cookies are created on the backend and are sent to the frontend. Due to security risk, any "illegal" action caused by cookie data is covered by an error handler.
 >  - Sprites image engine covers creating png, as well as jpg files with a bunch of options
 >  - After successful creation of the sprites image, the user is offered a complete implementation of the frontend frameworks with inserted image data that is easily copied and loaded into the project, as well as downloaded created images
 >  - The above page also contains all individual thumbnails in order to easily and quickly copy / paste-apply to the project
 ----------


### Frontend details:

 >  - Frontend out is based on the principle of "absolute" responsiveness. As both the width of the screen and the height - header is always "up", the footer is always at the bottom, the content is always centered in the middle regardless of the width and height of the screen. Although I did not design because I'm not an "artistic soul" - as seen from the enclosed, the frontend meets the principles of tracking "double" design. Where one design is for "larger" devices / screens, the other for those smaller - up to 480px. Below 480px, the entire content is proportionally reduced. This is accomplished with a pair of SASS functions, where the "reference" size is associated with the REM size, and with one "media" condition for this purpose
 >  - EJS - Although a nominal backend ?, it also serves as an excellent organizer of document parts
 >  - HTML5 - Semantic tags and input types of the newer date were used
 >  - CSS3 - css transitions were used for UI / UX, partly followed BEM nomenclature where it made sense - there was no need for complete application because CSS relies on nesting in the "main" containers in SASS, and I personally think that "exaggeration" with The BEM nomenclature leads to a very "dirty" html
 >  - SASS - used - a powerful tool for structuring CSS files in development
 >  - JS - Complete FE JavaScript strictly follows the ECMA 5 nomenclature - for compatibility with browsers. Most of the nominations of variables and functions are localized within self-executing functions so that the global scope does not "burst" with a large number of nominations. Only a few variables and a couple of functions are globalized to the window scope because they are used in multiple scripts at the same time.
 >  - Apart from Jquery, no framework or library was used. Moreover, it is avoided using and insufficiently cross-browser-compliant css3 sizes - like Flex or Grid.
 >  - Parts of JS and CSS that are loaded on all pages are located respectively in main.js and main.css in order to "load once" or "download" from site to site. Each subsequent browser request loads from cache, so the amount of code to send to FE is reduced.
 >  - The development part of the frontend is located in the "FE-Development" folder, from where the files are compiled / prefixed / minifized into a public folder - with the help of gulp.watch tasks
 ----------


### Backend details:

 >  - Backend manages Node.js / Express with "ejs view-engine" on one process and mongoDB locally / on the same machine, on another process. During development, the same principle is followed - node.js and local mongoDB. The process of connecting images is through a gulp module that nodes use internally and actively. From the module specific to the project, there are also "part", "fs", "gulp", "gulp.spritesmith" and "merge-stream", in addition to the usual: "express", "cookie-parser", "body-parser "," express-fileupload "," path "....
 >  - I considered it necessary to emphasize the importance of logging, so I therefore set aside for this error a special page that "shouts" this error
 >  - Errors that would break the process - "crash" the site are localized to log on server-side and ignored - module errors, database operation errors, ...
 >  - For common mistakes, I have allocated a station that is rendered and sent out stylized on the frontend - 404, bad extension, ...
 >  - The biggest problem I've encountered is the use of individual modules that work in my own "ecosystem" - promises often do not end with a callback, although they perform the default task, and somewhere in the module, information about the "unfinished" job remains, so that in the next call, " website. This is characteristic for async-sync functions within an async environment. I found the solution in the try / catch method and logging the error on the server, which resets the promo status so the function is ready for "use"
 >  - All the files that the user requests are stored in the public folder, because I think that everything that is "uploaded" to the server by the user is in some way a "dirty" file that should not enter the "protected" "zones, or folders, so that one user practically has the ability to access" other "images, but this is not important for this type of project because the privacy of these images is not important
 >  - The complete backend follows the ECMA 6 JavaScript nomenclature
 ----------


### Implementation details:

 > - The site is located on a "real" VPS hosting, with a real domain. Hosting lease was offered only "blank panel", so I installed everything myself - from Ubuntu, through Node to mongoDB ... and some other tools ...
 > - Access to the site is provided via SSH key, as well as upload from gitHub via another SSH key
 ----------


### Used tools and software:

 > - DEVELOPMENT: VsCode, Gulp, Sass, Chrome dev tools, mongod, node server, Mongo Management Studio, WinSCP, POSTMAN, Photoshop
 > - IMPLEMENTATION: PuTTY, WinSCP, "Linux commands", npm PM2 runtime



