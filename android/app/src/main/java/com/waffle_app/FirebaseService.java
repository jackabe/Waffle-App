package com.waffle_app;

import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;


public class FirebaseService {

    private FirebaseFirestore mFirestore;

    public FirebaseService() {
        mFirestore = FirebaseFirestore.getInstance();
    }

    public void addCollection() {
        // Get a reference to the restaurants collection
        CollectionReference locations = mFirestore.collection("user_collection/KyCoZe0qYZPlaLPB8bUgZHkN2SD2");
        UserLocation userLocation = new UserLocation("test");
        locations.add(userLocation);
    }
}
class UserLocation {

    String name;

    public UserLocation(String name) {
        this.name = name;
    }

}