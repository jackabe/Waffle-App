package com.waffle_app;

import com.google.firebase.Timestamp;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.Date;


public class FirebaseService {

    private FirebaseFirestore mFirestore;

    public FirebaseService() {
        mFirestore = FirebaseFirestore.getInstance();
    }

    public void addCollection(String uuid, String info, String time) {
        Date date = new Date();
        // Get a reference to the restaurants collection
        CollectionReference locations = mFirestore.collection("user_locations").document(uuid).collection(new Timestamp(date).toString());
        UserLocation userLocation = new UserLocation(uuid, info, time);
        locations.add(userLocation);
    }
}
class UserLocation {

    String uuid;
    String info;
    String time;

    public UserLocation(String uuid, String info, String time) {
        this.uuid = uuid;
        this.info = info;
        this.time = time;
    }

}