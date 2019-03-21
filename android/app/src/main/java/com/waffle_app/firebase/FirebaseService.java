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


import android.content.Context;
        import android.content.SharedPreferences;
        import android.location.Location;
        import android.util.Log;

        import com.google.firebase.auth.FirebaseAuth;
        import com.google.firebase.auth.FirebaseUser;

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

        import java.util.Date;
        import java.util.concurrent.TimeUnit;

public class APIService {

    private final String TAG = "API_SERVICE";
    private Context mContext;
    public static final String MyPREFERENCES = "MyPrefs" ;
    public static final String TOKEN_KEY = "auth_user_token";
    public static final MediaType MEDIA_TYPE = MediaType.parse("application/json");
    private OkHttpClient client = new OkHttpClient();

    public APIService(Context c) {
        this.mContext = c;
    }

    public void postDeviceLocation(final Location location){
        Log.d(TAG,">>> posting device location " + location.getLatitude() + " " + location.getLongitude());

        String user_id = this.getAuthUserID();
        String token = this.getAuthUserToken();

        if(user_id != null && token != null){

            JSONObject body = new JSONObject();
            try {
                body.put("user_id", getAuthUserID());
                body.put("lat", Double.toString(location.getLatitude()));
                body.put("lng", Double.toString(location.getLongitude()));
            } catch(JSONException e){
                e.printStackTrace();
            }

            RequestBody requestBody = RequestBody.create(MEDIA_TYPE, body.toString());

            final Request request = new Request.Builder()
                    .url(mContext.getString(R.string.mobile_api_url))
                    .post(requestBody)
                    .header("x-access-token", getAuthUserToken())
                    .header("Content-Type", "application/json; charset=UTF-8")
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
                    String mMessage = response.body().string();
                    if (response.isSuccessful()){
                        Log.w(TAG, ">>> Location post success:" + mMessage);
                    }
                }
            });
        }
    }


    private String getAuthUserID(){
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        return user != null ? user.getUid() : null;
    }

    private String getAuthUserToken(){
        SharedPreferences prefs = mContext.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        return prefs.getString(TOKEN_KEY, null);
    }
}
