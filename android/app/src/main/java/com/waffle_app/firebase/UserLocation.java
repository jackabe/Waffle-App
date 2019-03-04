package com.waffle_app.firebase;

class UserLocation {

    private String uuid;
    private float accuracy;
    private double latitude;
    private double longitude;
    private String time;
    private String geofenceName;

    public UserLocation(String uuid, String geofenceName, double latitude, double longitude, float accuracy, String time) {
        this.uuid = uuid;
        this.geofenceName = geofenceName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.accuracy = accuracy;
        this.time = time;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getGeofenceName() {
        return geofenceName;
    }

    public void setGeofenceName(String geofenceName) {
        this.geofenceName = geofenceName;
    }

    public float getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(float accuracy) {
        this.accuracy = accuracy;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
