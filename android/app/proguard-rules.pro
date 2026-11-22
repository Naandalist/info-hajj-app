# Keep the react-native-config native module
-keep class com.lugg.ReactNativeConfig { *; }

# Room instantiates the generated *_Impl database class reflectively.
# R8 full mode strips its no-arg constructor otherwise (WorkManager /
# androidx.work ships Room 2.2.5, whose own rule keeps the class name only).
-keep class * extends androidx.room.RoomDatabase {
    <init>();
}

# Keep all generated BuildConfig constants
-keepclassmembers class **.BuildConfig {
    public static final java.lang.String *;
}

 -keep class com.naandalist.info_haji.BuildConfig { *; }
