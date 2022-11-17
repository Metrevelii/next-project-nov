import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  // fetch data from an API or DB
  const client = await MongoClient.connect(
    "mongodb+srv://metreveli33:Metrevel1@cluster0.0ma5ck6.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  
  const meetups = await meetupsCollection.find().toArray();

  // close connection once we're done;
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        // not description cuz we dont output it in new meetups
    }))
    },
    revalidate: 1,
  };
}

export default HomePage;
