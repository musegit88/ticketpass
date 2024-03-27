"use server";

import prismaDb from "@/lib/prismaDB";
import {
  CreateEventProps,
  GetAllEventsParams,
  GetEventByUserProps,
  RelatedEventsByCategoryProps,
  UpdateEventProps,
} from "@/types/types";
import { revalidatePath } from "next/cache";
import { getCategoryById, getCategoryByName } from "./category.actions";
import { getUserById } from "./user.actions";

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventProps) => {
  const {
    title,
    categoryId,
    description,
    location,
    isOnline,
    imageUrl,
    isFree,
    price,
    startTime,
    endTime,
    url,
  } = event;
  try {
    const eventOrganizer = await prismaDb.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!eventOrganizer) {
      throw new Error("Event organizer not found");
    }

    const newEvent = await prismaDb.event.create({
      data: {
        title,
        categoryId,
        description,
        location,
        isOnline,
        imageUrl,
        isFree,
        price,
        startTime,
        endTime,
        url,
        userId,
      },
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
  }
};
export const updateEvent = async ({
  event,
  userId,
  eventId,
  path,
}: UpdateEventProps) => {
  const {
    title,
    categoryId,
    description,
    location,
    imageUrl,
    isFree,
    price,
    startTime,
    endTime,
    url,
  } = event;
  const eventOrganizer = await prismaDb.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!eventOrganizer) {
    throw new Error("Event organizer not found");
  }
  try {
    const updatedEvent = await prismaDb.event.update({
      where: {
        id: eventId,
      },
      data: {
        title,
        categoryId,
        description,
        location,
        imageUrl,
        isFree,
        price,
        startTime,
        endTime,
        url,
        userId,
      },
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    console.log(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const event = await prismaDb.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        organizer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!event) {
      throw new Error("Event not found");
    }
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    const skipAmount = (Number(page) - 1) * limit;
    const categorycondition = category
      ? await getCategoryByName(category)
      : null;

    // Category query
    const categoryQuery = await prismaDb.event.findMany({
      where: {
        categoryId: categorycondition?.id,
      },
      include: {
        organizer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skipAmount,
      take: limit,
    });


    //search event 
    const searchedEvent: any = await prismaDb.event.findRaw({
      filter: { title: { $regex: query } },
      options: {
        $options: "i",
      },
    });

    // Get category for searched event
    const fetchCategory = await searchedEvent?.map((event: any) => ({
      categoryId: event.categoryId.$oid,
    }));
    const categoryId = fetchCategory[0].categoryId;
    const getCategory = await getCategoryById(categoryId as string);

    // Get user for searched event
    const fetchUser = await searchedEvent?.map((event: any) => ({
      userId: event.userId.$oid,
    }));
    const userId = fetchUser[0].userId;
    const getUser = await getUserById(userId as string);

    // Formated searched event
    const searchedEventResponse = searchedEvent?.map((event: any) =>
      Object.assign(
        {
          id: event?._id.$oid,
          categoryId: event?.categoryId
            ? { connect: { id: event.categoryId.$oid } }
            : undefined,
          userId: event?.userId.$oid,
          title: event?.title,
          description: event?.description,
          location: event?.location,
          isOnline: event?.isOnline,
          imageUrl: event?.imageUrl,
          isFree: event?.isFree,
          price: event?.price,
          startTime: event?.startTime,
          endtime: event?.endTime,
          url: event?.url,
          createdAt: event?.createdAt,
          updatedAt: event?.updatedAt,
        },
        { category: getCategory, organizer: getUser }
      )
    );

    const eventsQuery = await prismaDb.event.findMany({
      include: {
        organizer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skipAmount,
      take: limit,
    });
    const events = query
      ? await searchedEventResponse
      : category
      ? categoryQuery
      : await eventsQuery;
    const eventsCount = await prismaDb.event.count();

    if (!events) {
      throw new Error("Events not found");
    }

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteEventById = async (eventId: string, path: string) => {
  try {
    const deletedEvent = await prismaDb.event.delete({
      where: {
        id: eventId,
      },
    });
    if (deletedEvent) revalidatePath(path);
    return JSON.parse(JSON.stringify("True"));
  } catch (error) {
    console.log(error);
  }
};
export const getRelatedEventsByCategory = async ({
  categoryId,
  eventId,
  page = 1,
  limit = 3,
}: RelatedEventsByCategoryProps) => {
  try {
    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = await prismaDb.event.findMany({
      where: {
        categoryId,
      },
      include: {
        organizer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: 1,
      take: limit,
    });

    const events = await eventsQuery;
    const eventsCount = await prismaDb.event.count({
      where: {
        id: eventId,
        categoryId,
      },
    });
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
};

export const getEventByUser = async ({
  userId,
  limit = 6,
  page = 1,
}: GetEventByUserProps) => {
  try {
    const eventsQuery = await prismaDb.event.findMany({
      where: {
        userId,
      },
      include: {
        organizer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
    const events = await eventsQuery;
    const eventsCount = await prismaDb.event.count({
      where: {
        userId,
      },
    });
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
};

export const getNewEvents = async () => {
  try {
    const events = await prismaDb.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        organizer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 3,
    });
    return {
      data: JSON.parse(JSON.stringify(events)),
    };
  } catch (error) {
    console.log(error);
  }
};
