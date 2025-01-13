npx expo prebuild --no-install --platform android && \
npx expo export:embed --eager --platform android --dev false && \
cd ./android && \
./gradlew :app:assembleRelease && \
cd ..