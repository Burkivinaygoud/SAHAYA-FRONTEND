import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [teamData, setTeamData] = useState({
    founder: [
      {
        name: 'President',
        role: 'Club Founder',
        img: '',
        type: 'founder',
        quote:
          '"At SAHAYA, we believe that every child deserves an opportunity to learn, grow, and achieve their dreams. Through our collective efforts and unwavering commitment, we are creating a brighter future for underprivileged children. Together, we can make a real difference in their lives."',
      },
    ],
    volunteers: {
      description:
        'Our volunteers are the beating heart of SAHAYA. They bring boundless energy, compassion, and commitment to every initiative — from classroom sessions and field trips to community drives and events. Their selfless dedication transforms lives and fuels our mission every single day.',
      groupPhoto: 'images/volunteers-group.jpg',
    },
    committee: [
      {
        name: 'President',
        role: 'Working Committee',
        img: '',
        type: 'committee',
      },
      {
        name: 'Vice President',
        role: 'Working Committee',
        img: '',
        type: 'committee',
      },
      {
        name: 'Coordinator 1',
        role: 'Working Committee',
        img: '',
        type: 'committee',
      },
      {
        name: 'Coordinator 2',
        role: 'Working Committee',
        img: '',
        type: 'committee',
      },
      {
        name: 'Social Media Manager',
        role: 'Working Committee',
        img: '',
        type: 'committee',
      },
      {
        name: 'Treasurer',
        role: 'Working Committee',
        img: '',
        type: 'committee',
      },
    ],
  });

  const [eventsData, setEventsData] = useState([
    {
      title: 'Annual Education Drive 2025',
      date: '2025-03-15',
      desc: 'Distribution of books, stationery and supplies.',
      loc: 'HITAM Campus',
      time: '10:00',
    },
    {
      title: 'Career Guidance Workshop',
      date: '2025-03-22',
      desc: 'Empowering 9th & 10th class students.',
      loc: 'Govt. High School',
      time: '09:00',
    },
    {
      title: 'Orphanage Fun Day',
      date: '2025-04-05',
      desc: 'A day of games and joy for children.',
      loc: 'Orphanage, Hyderabad',
      time: '11:00',
    },
  ]);

  const defaultGallery = [
    {
      url: 'images/gallery-1.jpg',
      caption: 'Gallery 1',
    },
    {
      url: 'images/gallery-2.jpg',
      caption: 'Gallery 2',
    },
    {
      url: 'images/gallery-3.jpg',
      caption: 'Gallery 3',
    },
    {
      url: 'images/gallery-4.jpg',
      caption: 'Gallery 4',
    },
    {
      url: 'images/gallery-5.jpg',
      caption: 'Gallery 5',
    },
    {
      url: 'images/gallery-6.jpg',
      caption: 'Gallery 6',
    },
  ];

  const [galleryData, setGalleryData] = useState(() => {
    const saved = localStorage.getItem('sahayaGallery');
    return saved ? JSON.parse(saved) : defaultGallery;
  });

  const [programsData, setProgramsData] = useState([
    {
      title: 'Holistic Development',
      cat: 'Development',
      desc: 'Enabling all-round development through LifeSkills improvement, Science Fairs, Sahaya Art World, and Sahaya Sports.',
      img: 'images/holistic-development.jpeg',
    },
    {
      title: 'Sweecha',
      cat: 'Events',
      desc: 'Organising events on various occasions to ignite kids\' interest and increase awareness in the community.',
      img: 'images/swechaa.jpg',
    },
    {
      title: 'My Library',
      cat: 'Education',
      desc: 'Installing the habit of reading and expanding the horizons of learning through accessible book collections and reading initiatives.',
      img: 'images/my-library.png',
    },
    {
      title: 'Field Trips',
      cat: 'Outreach',
      desc: 'Enflaming the passion to seek knowledge and dream big through educational excursions and experiential learning activities.',
      img: 'images/field-trips-group.jpg',
    },
  ]);

  const [messagesData, setMessagesData] = useState(() => {
    const saved = localStorage.getItem('sahayaMessages');
    return saved ? JSON.parse(saved) : [];
  });

  const [programsDoneData, setProgramsDoneData] = useState([]);

  const [stats, setStats] = useState({
    years: 17,
    children: 1500,
    events: 300,
    volunteers: 500,
  });

  const addEvent = (event) => {
    setEventsData([...eventsData, event]);
  };

  const deleteEvent = (index) => {
    setEventsData(eventsData.filter((_, i) => i !== index));
  };

  const updateEvent = (index, event) => {
    const updated = [...eventsData];
    updated[index] = event;
    setEventsData(updated);
  };

  const addGalleryImage = (image) => {
    const updated = [image, ...galleryData];
    setGalleryData(updated);
    localStorage.setItem('sahayaGallery', JSON.stringify(updated));
  };

  const deleteGalleryImage = (index) => {
    const updated = galleryData.filter((_, i) => i !== index);
    setGalleryData(updated);
    localStorage.setItem('sahayaGallery', JSON.stringify(updated));
  };

  const updateGalleryImage = (index, image) => {
    const updated = [...galleryData];
    updated[index] = image;
    setGalleryData(updated);
    localStorage.setItem('sahayaGallery', JSON.stringify(updated));
  };

  const addProgram = (program) => {
    setProgramsData([...programsData, program]);
  };

  const deleteProgram = (index) => {
    setProgramsData(programsData.filter((_, i) => i !== index));
  };

  const updateProgram = (index, program) => {
    const updated = [...programsData];
    updated[index] = program;
    setProgramsData(updated);
  };

  const addProgramDone = (program) => {
    setProgramsDoneData([...programsDoneData, program]);
  };

  const deleteProgramDone = (index) => {
    setProgramsDoneData(programsDoneData.filter((_, i) => i !== index));
  };

  const updateProgramDone = (index, updatedProgram) => {
    const updated = [...programsDoneData];
    updated[index] = updatedProgram;
    setProgramsDoneData(updated);
  };

  const addTeamMember = (member) => {
    setTeamData({
      ...teamData,
      [member.type]: [...teamData[member.type], member],
    });
  };

  const deleteTeamMember = (type, index) => {
    setTeamData({
      ...teamData,
      [type]: teamData[type].filter((_, i) => i !== index),
    });
  };

  const updateTeamMember = (type, index, member) => {
    const updated = [...teamData[type]];
    updated[index] = member;
    setTeamData({ ...teamData, [type]: updated });
  };

  const addMessage = (message) => {
    const newMessages = [
      ...messagesData,
      { id: Date.now(), ...message, date: new Date().toLocaleString() },
    ];
    setMessagesData(newMessages);
    localStorage.setItem('sahayaMessages', JSON.stringify(newMessages));
  };

  const deleteMessage = (index) => {
    const newMessages = messagesData.filter((_, i) => i !== index);
    setMessagesData(newMessages);
    localStorage.setItem('sahayaMessages', JSON.stringify(newMessages));
  };

  const clearAllMessages = () => {
    setMessagesData([]);
    localStorage.setItem('sahayaMessages', JSON.stringify([]));
  };

  const updateStats = (newStats) => {
    setStats(newStats);
  };

  return (
    <DataContext.Provider
      value={{
        teamData,
        setTeamData,
        eventsData,
        addEvent,
        deleteEvent,
        galleryData,
        addGalleryImage,
        deleteGalleryImage,
        programsData,
        addProgram,
        deleteProgram,
        programsDoneData,
        addProgramDone,
        deleteProgramDone,
        updateProgramDone,
        messagesData,
        addMessage,
        deleteMessage,
        clearAllMessages,
        addTeamMember,
        deleteTeamMember,
        updateTeamMember,
        updateEvent,
        updateGalleryImage,
        updateProgram,
        stats,
        updateStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
