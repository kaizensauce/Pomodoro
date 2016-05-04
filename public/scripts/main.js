// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        scripts: '../scripts',
        "utilities": '../scripts/utilities',
        "services": '../scripts/services',
        "react": "https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react",
        "react-dom": "https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom",
        "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min",
        "jquery": "https://code.jquery.com/jquery-2.2.3.min"
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['jsx!/scripts/pomodoro']);
