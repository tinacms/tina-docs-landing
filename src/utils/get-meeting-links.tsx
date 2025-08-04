import client from "../../tina/__generated__/client";

export const fetchMeetingLinks = async () => {
  const meetingPeopleResponse = await client.queries.meetingLinks({
    relativePath: "meeting-links.json",
  });
  const meetingPeopleData =
    meetingPeopleResponse.data.meetingLinks?.bookingCard?.map(
      (person: any) => ({
        name: person.name || "",
        description: person.description || "",
        image: person.image || "",
        url: person.url || "#",
      })
    );
  return meetingPeopleData;
};
