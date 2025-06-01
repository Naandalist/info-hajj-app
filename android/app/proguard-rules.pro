# Keep the react-native-config native module
-keep class com.lugg.ReactNativeConfig { *; }

# Keep all generated BuildConfig constants
-keepclassmembers class **.BuildConfig {
    public static final java.lang.String *;
}

 -keep class com.naandalist.info_haji.BuildConfig { *; }
