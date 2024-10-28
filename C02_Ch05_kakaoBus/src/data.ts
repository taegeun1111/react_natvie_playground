import dayjs from "dayjs";

export const busStop = {
  id: 23284,
  name: "강남역12번출구",
  directionDescription: "강남역.강남역사거리",
  isBookmarked: true,
  buses: [
    {
      type: "B",
      num: 146,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(8, "minute"),
          numOfRemainedStops: 5,
          numOfPassengers: 3,
        },
        {
          arrivalTime: dayjs().add(21, "minute").add(3, "second"),
          numOfRemainedStops: 11,
          numOfPassengers: 5,
        },
      ],
    },
    {
      type: "B",
      num: 360,
      directionDescription: "지하철2호선강남역",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(50, "second"),
          numOfRemainedStops: 1,
          numOfPassengers: 32,
        },
        {
          arrivalTime: dayjs().add(10, "minute").add(30, "second"),
          numOfRemainedStops: 6,
          numOfPassengers: 25,
        },
      ],
    },
    {
      type: "B",
      num: 740,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(1, "minute").add(5, "second"),
          numOfRemainedStops: 1,
          numOfPassengers: 22,
        },
        {
          arrivalTime: dayjs().add(14, "minute"),
          numOfRemainedStops: 5,
          numOfPassengers: 8,
        },
      ],
    },
    {
      type: "G",
      num: 3412,
      directionDescription: "강남역",
      isBookmarked: true,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(5, "minute").add(10, "second"),
          numOfRemainedStops: 4,
          numOfPassengers: 8,
        },
        {
          arrivalTime: dayjs().add(18, "minute").add(14, "second"),
          numOfRemainedStops: 18,
          numOfPassengers: 16,
        },
      ],
    },
    {
      type: "R",
      num: 1100,
      directionDescription: "지하철2호선.강남역(중)",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(70, "minute"),
          numOfRemainedStops: 42,
          numOfPassengers: 3,
        },
      ],
    },
    {
      type: "R",
      num: 1700,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: true,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(12, "minute"),
          numOfRemainedStops: 7,
          numOfPassengers: 39,
        },
        {
          arrivalTime: dayjs().add(44, "minute").add(10, "second"),
          numOfRemainedStops: 22,
          numOfPassengers: 4,
        },
      ],
    },
    {
      type: "R",
      num: 2000,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [],
    },
    {
      type: "R",
      num: 3600,
      directionDescription: "지하철2호선.강남역(중)",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(11, "minute").add(44, "second"),
          numOfRemainedStops: 6,
          numOfPassengers: 11,
        },
        {
          arrivalTime: dayjs().add(39, "minute").add(42, "second"),
          numOfRemainedStops: 14,
          numOfPassengers: 10,
        },
      ],
    },
    {
      type: "R",
      num: 7007,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(9, "minute").add(23, "second"),
          numOfRemainedStops: 5,
          numOfPassengers: 2,
        },
        {
          arrivalTime: dayjs().add(24, "minute").add(50, "second"),
          numOfRemainedStops: 12,
          numOfPassengers: 2,
        },
      ],
    },
    {
      type: "R",
      num: 8001,
      directionDescription: "지하철2호선.강남역(중)",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(20, "minute").add(48, "second"),
          numOfRemainedStops: 10,
          numOfPassengers: 3,
        },
      ],
    },
    {
      type: "R",
      num: 9303,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: true,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(20, "minute").add(48, "second"),
          numOfRemainedStops: 10,
          numOfPassengers: 20,
        },
      ],
    },
    {
      type: "R",
      num: 9600,
      directionDescription: "강남역.강남역사거리",
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(28, "minute").add(7, "second"),
          numOfRemainedStops: 16,
          numOfPassengers: 6,
        },
      ],
    },
  ],
};
