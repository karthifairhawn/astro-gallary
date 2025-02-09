import { Photo } from '../types';

export const photos: Photo[] = [
  {
    id: 1,
    title: "Andromeda Galaxy",
    description: "M31 captured during a clear winter night",
    images: [
      "https://images.unsplash.com/photo-1543722530-d2c3201371e7",
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0"
    ],
    date: "2024-02-15",
    location: "Dark Sky Site",
    equipment: "Celestron EdgeHD 11, ZWO ASI2600MM Pro",
    tags: ["galaxy", "deep-sky", "messier"]
  },
  {
    id: 2,
    title: "Orion Nebula",
    description: "M42 in full color glory",
    images: [
      "https://images.unsplash.com/photo-1454789548928-9efd52dc4031",
      "https://images.unsplash.com/photo-1462332420958-a05d1e002413"
    ],
    date: "2024-01-20",
    location: "Backyard",
    equipment: "William Optics GT81, ASI533MC Pro",
    tags: ["nebula", "deep-sky", "messier"]
  },
  {
    id: 3,
    title: "Pleiades",
    description: "The Seven Sisters cluster",
    images: [
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3"
    ],
    date: "2024-03-01",
    location: "Mountain Observatory",
    equipment: "Takahashi FSQ-106, QHY600M",
    tags: ["cluster", "deep-sky", "messier"]
  }
];