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
        FENCES.put("CloseComms", new LatLng(51.587566,-3.003584));
        FENCES.put("Home", new LatLng(51.487337, -3.172598));
        FENCES.put("Tesco Cathays", new LatLng(51.487962, -3.173471));
        FENCES.put("Newport Train Station", new LatLng(51.588797, -3.001246));
        FENCES.put("Cathays Train Station", new LatLng(51.488922, -3.178748));
        FENCES.put("McDonalds Newport", new LatLng(51.588218, -2.997014));
        FENCES.put("Tesco Newport", new LatLng(51.588301, -2.997449));
        FENCES.put("Subway Newport", new LatLng(51.588624, -2.997138));
        FENCES.put("NSA", new LatLng(51.589817, -2.998101));
        FENCES.put("The Gym Cardiff", new LatLng(51.482667, -3.172786));
        FENCES.put("Cardiff Queen Street Station", new LatLng(51.481919, -3.170376));
        FENCES.put("Cardiff Central Station", new LatLng(51.475656, -3.179138));
        FENCES.put("Morgans Home", new LatLng(51.499775, -3.178656));
        FENCES.put("Admiral", new LatLng(51.479226, -3.172856));
        FENCES.put("Queens Arcade", new LatLng(51.481227, -3.176816));
        FENCES.put("St Davids", new LatLng(51.480074, -3.176034));
    }
}


