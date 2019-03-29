package com.waffle_app.firebase;

import android.util.Log;

import java.io.IOException;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import org.json.JSONException;
import org.json.JSONObject;

public class FirebaseService {

    private OkHttpClient client = new OkHttpClient();
    private final String TAG = "API_SERVICE";
    public static final MediaType MEDIA_TYPE = MediaType.parse("application/json");

    public FirebaseService() {

    }

    public void addCollection(String uuid, String geofenceName, double latitude, double longitude, float accuracy, String time) {
        Log.d(TAG, ">>> posting device location " + geofenceName);

        JSONObject body = new JSONObject();
        try {
            body.put("user_id", uuid);
            body.put("timestamp", time);
            body.put("geofenceName", geofenceName);
            body.put("latitude", Double.toString(latitude));
            body.put("longitude", Double.toString(longitude));
            body.put("accuracy", accuracy);
        } catch (JSONException e) {
            e.printStackTrace();
            Log.d(TAG, ">>> error posting location " + geofenceName);
        }

        RequestBody requestBody = RequestBody.create(MEDIA_TYPE, body.toString());

        Log.d(TAG, ">>> forming request " + geofenceName);
        final Request request = new Request.Builder()
                .url("http://18.188.105.214/postLocation")
                .post(requestBody)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                String mMessage = e.getMessage().toString();
                Log.w(TAG, ">>> Location post failure:" + mMessage);
            }

            @Override
            public void onResponse(Call call, Response response)
                    throws IOException {
                Log.d(TAG, ">>> posted");
                String mMessage = response.body().string();
                Log.d(TAG, ">>> "+mMessage);
                if (response.isSuccessful()){
                    Log.w(TAG, ">>> Location post success:" + mMessage);
                }
            }
        });

    }

}

