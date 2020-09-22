import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';



export function uploadImage(selectedImage, Imageurl, setlaod) {
  console.log(selectedImage)
  if (selectedImage) {
    const fileExtension = selectedImage;
    console.log("EXT: " + fileExtension);

    var uuid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20);
    var uuid1 = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    console.log("name: " + `${uuid}-${uuid1}`);
    const fileName = `${uuid}-${uuid1}`;
    console.log(fileName);
    setlaod(true);
    var storageRef = storage().ref(`userupload/${fileName}`);

    storageRef.putFile(selectedImage)
      .on(
        storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log("snapshot: " + snapshot.state);
          console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          if (snapshot.state === storage.TaskState.SUCCESS) {
            console.log("Success");
          }
        },
        error => {
          setlaod(false)
          alert('No Internet Or You Cancel Operation');
        },
        () => {
          storageRef.getDownloadURL()
            .then((downloadUrl) => {
              console.log("File available at: " + downloadUrl);

              const useruploadurl = { "image": `${downloadUrl}` }

              addnewimage(useruploadurl);

              setlaod(false);


              Imageurl(downloadUrl);
            })
        }
      )
  }
  else { alert('Please Choose Image') }
};


export function addnewimage(image) {

  console.log("hello")


  firestore()
    .collection('UsersImage')
    .add(image)
    .then((snapshot) => {
      image.URL = snapshot.id;
      snapshot.set(image);
    })
    .catch((error) => console.log(error));
}