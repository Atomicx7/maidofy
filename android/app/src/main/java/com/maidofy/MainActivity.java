package com.maidofy;
    

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // import this

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // add this
        super.onCreate(savedInstanceState);
    }
    // ...existing code...
}

}
