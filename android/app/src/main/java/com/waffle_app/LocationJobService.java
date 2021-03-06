package com.waffle_app;

import android.app.PendingIntent;
import android.content.Intent;
import android.util.Log;

import com.firebase.jobdispatcher.JobParameters;
import com.firebase.jobdispatcher.JobService;
import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.model.LatLng;
import com.waffle_app.location.GeofenceBroadcastReceiver;

import java.util.ArrayList;
import java.util.Map;

public class LocationJobService extends JobService {

    private GeofencingClient mGeofencingClient;  // Provides access to the Geofencing API.
    private ArrayList<Geofence> mGeofenceList; // The list of geofences used in this sample.
    private PendingIntent mGeofencePendingIntent; // Used when requesting to add or remove geofences.

    @Override
    public boolean onStartJob(JobParameters job) {

        Log.i("Geofence Service", "Starting the service");
        // Do some work here

        // Initialise array list
        mGeofenceList = new ArrayList<>();
        // Create all of the geofences
        populateGeofenceList();
        // Initially set the PendingIntent used in addGeofences() and removeGeofences() to null.
        mGeofencePendingIntent = null;

        // Initialise the geofencing client
        mGeofencingClient = LocationServices.getGeofencingClient(getApplicationContext());

        // Start the service
        startGeofenceService();


        return true; // Answers the question: "Is there still work going on?"
    }

    @Override
    public boolean onStopJob(JobParameters job) {
        return false; // Answers the question: "Should this job be retried?"
    }

    /**
     * Builds and returns a GeofencingRequest. Specifies the list of geofences to be monitored.
     * Also specifies how the geofence notifications are initially triggered.
     */
    private GeofencingRequest getGeofencingRequest() {
        GeofencingRequest.Builder builder = new GeofencingRequest.Builder();
        // The INITIAL_TRIGGER_ENTER flag indicates that geofencing service should trigger a
        // GEOFENCE_TRANSITION_ENTER notification when the geofence is added and if the device
        // is already inside that geofence.
        builder.setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_DWELL);
        // Add the geofences to be monitored by geofencing service.
        builder.addGeofences(mGeofenceList);
        // Return a GeofencingRequest.
        return builder.build();
    }


    /**
     * Gets a PendingIntent to send with the request to add or remove Geofences. Location Services
     * issues the Intent inside this PendingIntent whenever a geofence transition occurs for the
     * current list of geofences.
     *
     * @return A PendingIntent for the IntentService that handles geofence transitions.
     */
    private PendingIntent getGeofencePendingIntent() {
        // Reuse the PendingIntent if we already have it.
        if (mGeofencePendingIntent != null) {
            return mGeofencePendingIntent;
        }
        Intent intent = new Intent(this, GeofenceBroadcastReceiver.class);
        mGeofencePendingIntent = PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        return mGeofencePendingIntent;
    }


    /**
     * Currently creates list of geofences hard coded
     * TODO Dynamically create geofences based on the user's location.
     */
    private void populateGeofenceList() {
        for (Map.Entry<String, LatLng> entry : Constants.FENCES.entrySet()) {
            mGeofenceList.add(new Geofence.Builder()
                    // Give request an ID
                    .setRequestId(entry.getKey()) // This is a string to identify this geofence.
                    // Set the circular region of this geofence.
                    .setCircularRegion(
                            entry.getValue().latitude,
                            entry.getValue().longitude,
                            Constants.GEOFENCE_RADIUS_IN_METERS
                    )
                    // Set the expiration duration of the geofence. This geofence gets automatically
                    // removed after this period of time.
                    .setExpirationDuration(Constants.GEOFENCE_EXPIRATION_IN_MILLISECONDS)
                    // Set the transition types of interest. Alerts only made for enter/exit
                    .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_DWELL)
                    .setLoiteringDelay(10000)
                    // Build the geofence.
                    .build());
        }
        Log.i("Geofence Service", "Created fences");
    }

    /**
     * Adds geofences, which sets alerts to be notified when the device enters or exits one of the
     * specified geofences. Handles the success or failure results returned by addGeofences().
     */
    public void startGeofenceService() {
        try {
            mGeofencingClient.addGeofences(getGeofencingRequest(), getGeofencePendingIntent());
        } catch (SecurityException e) {
        }
    }
}

