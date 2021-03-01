(function (win) {
    if (!("firebase" in win)) {
        console.error("firebase not found!");
        return;
    }

    var firebaseConfig = {
        apiKey: "AIzaSyDRIzUruAi5PVNfKkUxd9I9-KC9jYjrbq4",
        authDomain: "sao-1c398.firebaseapp.com",
        projectId: "sao-1c398",
        storageBucket: "sao-1c398.appspot.com",
        messagingSenderId: "639368207942",
        appId: "1:639368207942:web:036d2ebf19afab2e8bb447",
        measurementId: "G-BZHVBKTG2Y"
    };
    
    win.firebase.initializeApp(firebaseConfig);
    win.firebase.analytics();
})(window);