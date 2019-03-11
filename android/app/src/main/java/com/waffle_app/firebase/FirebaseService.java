package com.waffle_app.firebase;

import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.Date;

public class FirebaseService {

    private FirebaseFirestore mFirestore;

    public FirebaseService() {
        mFirestore = FirebaseFirestore.getInstance();
    }

    public void addCollection(String uuid, String geofenceName, double latitude, double longitude, float accuracy, String time) {
        DocumentReference locations = mFirestore.collection("user_locations").document(uuid).collection(time).document();
        UserLocation userLocation = new UserLocation(uuid, geofenceName, latitude, longitude, accuracy, time);
        locations.set(userLocation);
    }
}

