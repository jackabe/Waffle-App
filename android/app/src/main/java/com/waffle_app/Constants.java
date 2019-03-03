package com.waffle_app;

import com.google.android.gms.maps.model.LatLng;

import java.util.HashMap;

final class Constants {

    private Constants() {
    }

    /**
     * Used to set an expiration time for a geofence. After this amount of time Location Services
     * stops tracking the geofence.
     */
    private static final long GEOFENCE_EXPIRATION_IN_HOURS = 12;

    /**
     * For this sample, geofences expire after twelve hours.
     */
    static final long GEOFENCE_EXPIRATION_IN_MILLISECONDS =
            GEOFENCE_EXPIRATION_IN_HOURS * 60 * 60 * 1000;
    static final float GEOFENCE_RADIUS_IN_METERS = 100; // 100m

    /**
     * Map for storing information about fences
     */
    static final HashMap<String, LatLng> FENCES = new HashMap<>();

    static {
        // CloseComms
        FENCES.put("CloseComms1", new LatLng(51.587566,-3.003584));
        FENCES.put("Home", new LatLng(51.487337, -3.172598));
        FENCES.put("Tesco", new LatLng(51.487962, -3.173471));
        FENCES.put("Train Station", new LatLng(51.588643,-3.001578));
    }
}


