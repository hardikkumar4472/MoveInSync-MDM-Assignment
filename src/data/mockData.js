export const regions = ["Bangalore", "Hyderabad", "Mumbai", "Delhi", "Chennai", "Pune"];
export const versions = ["v2.4.0", "v2.3.6", "v2.3.5", "v2.3.0", "v2.2.0"];
export const statuses = ["Up-to-date", "Outdated", "Failed", "Inactive"];
export const mockDevices = Array.from({ length: 50 }, (_, i) => {
  const region = regions[Math.floor(Math.random() * regions.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const version = status === "Up-to-date" ? versions[0] : versions[Math.floor(Math.random() * (versions.length - 1)) + 1];
  const lastSeenDays = status === "Inactive" ? Math.floor(Math.random() * 20) + 8 : Math.floor(Math.random() * 7);
  let compliance = "compliant";
  if (status === "Outdated") compliance = "outdated";
  if (status === "Failed") compliance = "blocked";
  const auditHistory = [
    {
      id: "UPD-101",
      targetVersion: versions[0],
      sourceVersion: versions[1],
      status: status === "Up-to-date" ? "Completed" : "Failed",
      startTime: "2026-02-20 10:00 AM",
      steps: [
        { name: "Scheduled", time: "10:00 AM", status: "success" },
        { name: "Notified", time: "10:05 AM", status: "success" },
        { name: "Download Started", time: "10:12 AM", status: "success" },
        { 
          name: "Download Completed", 
          time: "10:25 AM", 
          status: status === "Failed" ? "error" : "success",
          reason: status === "Failed" ? "Network Timeout at Download Stage" : null
        },
        { 
          name: "Install Completed", 
          time: status === "Up-to-date" ? "10:30 AM" : "--", 
          status: status === "Up-to-date" ? "success" : "pending" 
        }
      ]
    },
    {
      id: "UPD-098",
      targetVersion: versions[1],
      sourceVersion: versions[2],
      status: "Completed",
      startTime: "2026-01-15 09:00 AM",
      steps: [
        { name: "Scheduled", time: "09:00 AM", status: "success" },
        { name: "Notified", time: "09:02 AM", status: "success" },
        { name: "Download Started", time: "09:10 AM", status: "success" },
        { name: "Download Completed", time: "09:20 AM", status: "success" },
        { name: "Install Completed", time: "09:25 AM", status: "success" }
      ]
    }
  ];
  return {
    id: `DEV-${1000 + i}`,
    imei: Math.random().toString().slice(2, 17),
    appVersion: version,
    os: Math.random() > 0.5 ? "Android 13" : "Android 12",
    region: region,
    lastSeen: `${lastSeenDays} days ago`,
    status: status,
    compliance: compliance,
    lastSeenDays: lastSeenDays,
    city: region,
    model: ["Samsung Galaxy S21", "Google Pixel 6", "OnePlus 9", "Realme GT"][Math.floor(Math.random() * 4)],
    battery: `${Math.floor(Math.random() * 100)}%`,
    disk: `${Math.floor(Math.random() * 64)}GB / 128GB`,
    auditHistory: auditHistory
  };
});
export const heatmapData = regions.map(region => {
  return {
    region,
    "v2.4.0": Math.floor(Math.random() * 300) + 100,
    "v2.3.5": Math.floor(Math.random() * 150) + 50,
    "v2.3.0": Math.floor(Math.random() * 100) + 20,
    "v2.2.0": Math.floor(Math.random() * 50) + 10,
  };
});
export const mockRollouts = [
  {
    id: "ROLL-882",
    name: "Feb Fleet Patch",
    toVersion: "v2.4.0",
    fromVersion: "v2.3.5",
    status: "Active", 
    type: "Phased",
    progress: 68,
    stages: {
      scheduled: 5000,
      notified: 4850,
      downloading: 3200,
      installing: 1200,
      completed: 3400,
      failed: 45
    },
    startTime: "2026-02-21 08:00 AM"
  },
  {
    id: "ROLL-883",
    name: "Emergency Security Fix",
    toVersion: "v2.3.6",
    fromVersion: "v2.3.0",
    status: "Paused",
    type: "Immediate",
    progress: 12,
    stages: {
      scheduled: 1200,
      notified: 1200,
      downloading: 150,
      installing: 0,
      completed: 0,
      failed: 12
    },
    startTime: "2026-02-21 09:30 AM"
  }
];
