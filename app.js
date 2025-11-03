// CIVINET - Application JavaScript

// User Location
let userLocation = {
  city: 'San Francisco',
  state: 'CA',
  lat: null,
  lng: null
};

// Detect user location
function detectLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        userLocation.lat = position.coords.latitude;
        userLocation.lng = position.coords.longitude;
        
        // Update location display
        reverseGeocode(position.coords.latitude, position.coords.longitude);
      },
      function(error) {
        console.log("Location detection failed, using default:", error);
        updateLocationDisplay(userLocation.city);
      }
    );
  } else {
    console.log("Geolocation not supported");
    updateLocationDisplay(userLocation.city);
  }
}

// Reverse geocode to get city name (using a simple approximation)
function reverseGeocode(lat, lng) {
  // For demo purposes, we'll use approximate location based on coordinates
  // In production, you'd use a geocoding API
  updateLocationDisplay(userLocation.city);
}

function updateLocationDisplay(cityName) {
  const locationElements = document.querySelectorAll('.location-display');
  locationElements.forEach(el => {
    el.textContent = cityName;
  });
  
  const reportLocationInput = document.getElementById('report-location');
  if (reportLocationInput) {
    reportLocationInput.value = cityName;
  }
}

// User Profile Data
let userProfile = {
  name: "Dravid",
  phone: "+91 9876543210",
  email: "ethan.carter@email.com",
  aadhar: "XXXX XXX 123",
  joinedYear: "2021",
  profileVisible: true,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7bWPSjarPI3FB4VGma7TBRV0CmPhPYkJViKaGEAy6ik8biv5IWfi_Hj7tQvDNGnhXS6s3JX-NlpG4EUFmwrRPOaK931I-NA3BOU6fIyOkOAOfVT9caBNGCubQkFPePFobJOjJw2_RSGbcyTO9KgpEsNBrfM70Pou6Va281zpG2QSAFUcoH7b6vFEg9m27hNYFH-dMFdRQbfhRPCusCt2l2kpaGCBLam9owDV_vozZiUy5FqDA8-vZDlYmIA-I1o4V62wmCeMo8OFJ"
};

// Leaderboard Data - Mix of public and private profiles
const leaderboardData = {
  daily: [
    { name: "Alex Chen", points: 450, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz-oHk-UiSmtVqGyVbo_g_cZS8gxZ1IMlEBhB30_a0iJyOuuOEwcGsK9PLoILwEzxy4zAv0vBuJccNBM_AvR55Y3z_eXucx3AjeTl_FLOGRy-kz5uypogflwLuNg-_Mg_9d3R_PYd7u30Be4FaCQxoXVR1UjqkWFLOFw1DXn-nJFP6R-01eY4wh-kOAlKe4DylsCevPKxPqSmJK6CdulbX1VmxwG_OY95xsrbSlVoktvfK-d8S_pj6j66nEX0hsAM5l7bH5Frd-w", profileVisible: true, reportsSubmitted: 12 },
    { name: "Maya Johnson", points: 420, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3AhXIqMaurgE-Bk5qs6Z1X-2FTLS4Yxs_d9oDtgGue0GuYkdEp6PuDL_SIAa1kj_wIdHwaQ_7KgrdjRHT5o2yPe1Lz07JA71fcvQxA4Sin2eMzqkfo3KP2QO09EEoUMWNFMSlXamKaS061nOyMAxoxJ_KWNv4ju0jES-q5XSMLxpemIWVcdXm3WzwfRM_lw4Ntynzhds6p2IGliyj1sv99fTMY6FdORbTe58k3bRXbzzWMO51OtZ838cgt_R321aeWgIr7E_QKA", profileVisible: false, reportsSubmitted: 10 },
    { name: "Ethan Parker", points: 385, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO7HHTnm4VGB1_t8PakodprP6pTtq76HXajhZdl18QjBbQVJXeIUdrVsgCGN9ngSblGe-o3qZv3OxIRJg-K83p1tEpxvtVFgIg-NB8VZf0oKr7Tvw3TeD4ZDB07r6btulp8kaqZvXMxLMbTpixsJBfS4BkrVjLnXOBrZCZzAj9XLkC861dKKnHxHPkDLkXcZbBn2I1K-s4GbiiK5F6qEQ1Ga6KlqoKuf_33KNCQecj5bJbTkMUO0ZVhUbhQalBASBNl7JL9sWXjA", profileVisible: true, reportsSubmitted: 9 },
    { name: "Olivia Smith", points: 350, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi831cawecsa5JGiicDTLSBUtiYo125f6Y6qe9R7MHPuO9qQwcZeJ9gSgtOtx8Y-fcZOoPGmpAUwJHVJLSxty_Z89ah79PTMI47aBhHew7ZrjyH5dNszWP5ejBQc4C1kZq2Y5PbnnF_1Re6yFVIO_fRNWt-JO6CCwCE7uNFjc07MjIpqfMKazcOhMDMCIypJ2YeRDTRu7sS52fhre1B7VSn9_LF_FZX7v1G8LlUjBat_ThFRb7ZNyi3k30lzvQ_oI443uoHC1oIA", profileVisible: true, reportsSubmitted: 8 },
    { name: "Noah Williams", points: 320, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZTHSTmGGdT_eOGl_C72hEzP6ZnKldzxI4ZyCIWwaN_oP_VP9Zf-RR8V9NAoWZkhfw4YBYVGeUAnHYMLfSaZKs1DsTsbCcdnT4z_WjmNNstZu5us4BnIrngzss3vAoVwCEhavmCadXfdcUlx1pC0JlOyAvR4u3Qx_4WOh9MGa0IGtPNoCwXiXPV_epUSGXy2DqJkhgI3KOta4hi4TQyjS12ABapiyonLYpohC5D-H2f9TrdLzBq-OFRrI3uPf9CH-P_Gtfj5KqKA", profileVisible: false, reportsSubmitted: 7 }
  ],
  weekly: [
    { name: "Alex Chen", points: 1250, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz-oHk-UiSmtVqGyVbo_g_cZS8gxZ1IMlEBhB30_a0iJyOuuOEwcGsK9PLoILwEzxy4zAv0vBuJccNBM_AvR55Y3z_eXucx3AjeTl_FLOGRy-kz5uypogflwLuNg-_Mg_9d3R_PYd7u30Be4FaCQxoXVR1UjqkWFLOFw1DXn-nJFP6R-01eY4wh-kOAlKe4DylsCevPKxPqSmJK6CdulbX1VmxwG_OY95xsrbSlVoktvfK-d8S_pj6j66nEX0hsAM5l7bH5Frd-w", profileVisible: true, reportsSubmitted: 35 },
    { name: "Maya Johnson", points: 1180, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3AhXIqMaurgE-Bk5qs6Z1X-2FTLS4Yxs_d9oDtgGue0GuYkdEp6PuDL_SIAa1kj_wIdHwaQ_7KgrdjRHT5o2yPe1Lz07JA71fcvQxA4Sin2eMzqkfo3KP2QO09EEoUMWNFMSlXamKaS061nOyMAxoxJ_KWNv4ju0jES-q5XSMLxpemIWVcdXm3WzwfRM_lw4Ntynzhds6p2IGliyj1sv99fTMY6FdORbTe58k3bRXbzzWMO51OtZ838cgt_R321aeWgIr7E_QKA", profileVisible: false, reportsSubmitted: 32 },
    { name: "Ethan Parker", points: 1120, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO7HHTnm4VGB1_t8PakodprP6pTtq76HXajhZdl18QjBbQVJXeIUdrVsgCGN9ngSblGe-o3qZv3OxIRJg-K83p1tEpxvtVFgIg-NB8VZf0oKr7Tvw3TeD4ZDB07r6btulp8kaqZvXMxLMbTpixsJBfS4BkrVjLnXOBrZCZzAj9XLkC861dKKnHxHPkDLkXcZbBn2I1K-s4GbiiK5F6qEQ1Ga6KlqoKuf_33KNCQecj5bJbTkMUO0ZVhUbhQalBASBNl7JL9sWXjA", profileVisible: true, reportsSubmitted: 28 },
    { name: "Olivia Smith", points: 1050, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi831cawecsa5JGiicDTLSBUtiYo125f6Y6qe9R7MHPuO9qQwcZeJ9gSgtOtx8Y-fcZOoPGmpAUwJHVJLSxty_Z89ah79PTMI47aBhHew7ZrjyH5dNszWP5ejBQc4C1kZq2Y5PbnnF_1Re6yFVIO_fRNWt-JO6CCwCE7uNFjc07MjIpqfMKazcOhMDMCIypJ2YeRDTRu7sS52fhre1B7VSn9_LF_FZX7v1G8LlUjBat_ThFRb7ZNyi3k30lzvQ_oI443uoHC1oIA", profileVisible: true, reportsSubmitted: 25 },
    { name: "Noah Williams", points: 980, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZTHSTmGGdT_eOGl_C72hEzP6ZnKldzxI4ZyCIWwaN_oP_VP9Zf-RR8V9NAoWZkhfw4YBYVGeUAnHYMLfSaZKs1DsTsbCcdnT4z_WjmNNstZu5us4BnIrngzss3vAoVwCEhavmCadXfdcUlx1pC0JlOyAvR4u3Qx_4WOh9MGa0IGtPNoCwXiXPV_epUSGXy2DqJkhgI3KOta4hi4TQyjS12ABapiyonLYpohC5D-H2f9TrdLzBq-OFRrI3uPf9CH-P_Gtfj5KqKA", profileVisible: false, reportsSubmitted: 22 },
    { name: "Sophia Brown", points: 920, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Y3VmutfP_OpLZDT2otrPaN6uwO4n4YJEoF7ApIYjnZxI8aSkGj3ehazKB1YkGO_y9XLHInd43kVopXoZiA81Dohl3YktAHHp2uMadUZFTgRctznp-kut8HzsHlz73j1-ByOe-pumXFLlYm7yJ0AmtJV14e-m5wqB5IwzJhDt7498cMRca8tHX6WJKyqs0xkLBWQuBxbjc3czRratQqOSXUZS-iQ5ukZHx-nsIQwVuVJwGV_Hvh51Oc1Rmkse6pVMJ5fubf6qQg", profileVisible: true, reportsSubmitted: 20 },
    { name: "Liam Davis", points: 850, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpi60m3WXbGEz4ExMYM2sJJNyxOpVZcpedUHy5Dmx_82SAuP-mT267iLD1pXxddT0mhA3sMSr_lq_KXYW38k6Np4IWEJ-HywtBwT5Y-30aHNoaa-ZbxkeERw3tQ6sVZhoEjEJmMoqsdZzcnEeJgq-uvgz9j2BQsMajfX2pjN4GYZN8Jkt0T__EUAWeLLaH55-hFbXDAbf29Zr5aFi8QMBW-dJZlXpe7szuIr7neFQH1-OWBye1awmb7zJrK503xIaH5u7zw50_PA", profileVisible: false, reportsSubmitted: 18 },
    { name: "Isabella Martinez", points: 780, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkHgoPtDSoOkkMi8J4oODLroHkuupsk7cPg2kerDAbpjq-JQGRF73HS8mS0_cuekM2O_zLbHwJaZA_hfPTFcJ9WyxUoXWQFNk_wKTc7OD-NoVrrZvn_rWTCJPzKCtztsy9BjbEExHvxRb7k-J6MDw2OzB0NrUVEys7TexELK_c5uX155MkdNjWgAbiSnNrqYHCoROwJuHAClYqwoWF3tUMaTt0zyv7crbznmi60lhvtHTb2fceuRV7J-tLRjmRxQ3R0NkUD_xxAw", profileVisible: true, reportsSubmitted: 16 }
  ],
  alltime: [
    { name: "Alex Chen", points: 5230, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz-oHk-UiSmtVqGyVbo_g_cZS8gxZ1IMlEBhB30_a0iJyOuuOEwcGsK9PLoILwEzxy4zAv0vBuJccNBM_AvR55Y3z_eXucx3AjeTl_FLOGRy-kz5uypogflwLuNg-_Mg_9d3R_PYd7u30Be4FaCQxoXVR1UjqkWFLOFw1DXn-nJFP6R-01eY4wh-kOAlKe4DylsCevPKxPqSmJK6CdulbX1VmxwG_OY95xsrbSlVoktvfK-d8S_pj6j66nEX0hsAM5l7bH5Frd-w", profileVisible: true, reportsSubmitted: 142 },
    { name: "Maya Johnson", points: 4890, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3AhXIqMaurgE-Bk5qs6Z1X-2FTLS4Yxs_d9oDtgGue0GuYkdEp6PuDL_SIAa1kj_wIdHwaQ_7KgrdjRHT5o2yPe1Lz07JA71fcvQxA4Sin2eMzqkfo3KP2QO09EEoUMWNFMSlXamKaS061nOyMAxoxJ_KWNv4ju0jES-q5XSMLxpemIWVcdXm3WzwfRM_lw4Ntynzhds6p2IGliyj1sv99fTMY6FdORbTe58k3bRXbzzWMO51OtZ838cgt_R321aeWgIr7E_QKA", profileVisible: false, reportsSubmitted: 135 },
    { name: "Ethan Parker", points: 4560, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO7HHTnm4VGB1_t8PakodprP6pTtq76HXajhZdl18QjBbQVJXeIUdrVsgCGN9ngSblGe-o3qZv3OxIRJg-K83p1tEpxvtVFgIg-NB8VZf0oKr7Tvw3TeD4ZDB07r6btulp8kaqZvXMxLMbTpixsJBfS4BkrVjLnXOBrZCZzAj9XLkC861dKKnHxHPkDLkXcZbBn2I1K-s4GbiiK5F6qEQ1Ga6KlqoKuf_33KNCQecj5bJbTkMUO0ZVhUbhQalBASBNl7JL9sWXjA", profileVisible: true, reportsSubmitted: 128 },
    { name: "Olivia Smith", points: 4320, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi831cawecsa5JGiicDTLSBUtiYo125f6Y6qe9R7MHPuO9qQwcZeJ9gSgtOtx8Y-fcZOoPGmpAUwJHVJLSxty_Z89ah79PTMI47aBhHew7ZrjyH5dNszWP5ejBQc4C1kZq2Y5PbnnF_1Re6yFVIO_fRNWt-JO6CCwCE7uNFjc07MjIpqfMKazcOhMDMCIypJ2YeRDTRu7sS52fhre1B7VSn9_LF_FZX7v1G8LlUjBat_ThFRb7ZNyi3k30lzvQ_oI443uoHC1oIA", profileVisible: true, reportsSubmitted: 120 },
    { name: "Noah Williams", points: 3980, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZTHSTmGGdT_eOGl_C72hEzP6ZnKldzxI4ZyCIWwaN_oP_VP9Zf-RR8V9NAoWZkhfw4YBYVGeUAnHYMLfSaZKs1DsTsbCcdnT4z_WjmNNstZu5us4BnIrngzss3vAoVwCEhavmCadXfdcUlx1pC0JlOyAvR4u3Qx_4WOh9MGa0IGtPNoCwXiXPV_epUSGXy2DqJkhgI3KOta4hi4TQyjS12ABapiyonLYpohC5D-H2f9TrdLzBq-OFRrI3uPf9CH-P_Gtfj5KqKA", profileVisible: false, reportsSubmitted: 110 },
    { name: "Sophia Brown", points: 3650, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Y3VmutfP_OpLZDT2otrPaN6uwO4n4YJEoF7ApIYjnZxI8aSkGj3ehazKB1YkGO_y9XLHInd43kVopXoZiA81Dohl3YktAHHp2uMadUZFTgRctznp-kut8HzsHlz73j1-ByOe-pumXFLlYm7yJ0AmtJV14e-m5wqB5IwzJhDt7498cMRca8tHX6WJKyqs0xkLBWQuBxbjc3czRratQqOSXUZS-iQ5ukZHx-nsIQwVuVJwGV_Hvh51Oc1Rmkse6pVMJ5fubf6qQg", profileVisible: true, reportsSubmitted: 98 },
    { name: "Liam Davis", points: 3420, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpi60m3WXbGEz4ExMYM2sJJNyxOpVZcpedUHy5Dmx_82SAuP-mT267iLD1pXxddT0mhA3sMSr_lq_KXYW38k6Np4IWEJ-HywtBwT5Y-30aHNoaa-ZbxkeERw3tQ6sVZhoEjEJmMoqsdZzcnEeJgq-uvgz9j2BQsMajfX2pjN4GYZN8Jkt0T__EUAWeLLaH55-hFbXDAbf29Zr5aFi8QMBW-dJZlXpe7szuIr7neFQH1-OWBye1awmb7zJrK503xIaH5u7zw50_PA", profileVisible: false, reportsSubmitted: 92 },
    { name: "Isabella Martinez", points: 3190, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkHgoPtDSoOkkMi8J4oODLroHkuupsk7cPg2kerDAbpjq-JQGRF73HS8mS0_cuekM2O_zLbHwJaZA_hfPTFcJ9WyxUoXWQFNk_wKTc7OD-NoVrrZvn_rWTCJPzKCtztsy9BjbEExHvxRb7k-J6MDw2OzB0NrUVEys7TexELK_c5uX155MkdNjWgAbiSnNrqYHCoROwJuHAClYqwoWF3tUMaTt0zyv7crbznmi60lhvtHTb2fceuRV7J-tLRjmRxQ3R0NkUD_xxAw", profileVisible: true, reportsSubmitted: 85 }
  ]
};

// Anonymous avatar for private profiles
const anonymousAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Cpath d='M50 45c8.284 0 15-6.716 15-15s-6.716-15-15-15-15 6.716-15 15 6.716 15 15 15zm0 5c-11.046 0-20 8.954-20 20v10h40V70c0-11.046-8.954-20-20-20z' fill='%239ca3af'/%3E%3C/svg%3E";

// Mock Data for Reports
const reportsData = [
  {
    id: 1,
    title: "Vandalism at the park",
    status: "solved",
    reportedDate: "2023-09-15",
    description: "Graffiti and vandalism found at Central Park playground area",
    location: "Central Park, San Francisco",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0FtOjxyarrQ_2eDoZ262JchQlURpyIQPCIki9FZpcPaON05XCGo3nj43HHyGppWvbSD_fNHaIKA-MTfOa4UFq5NieHkpBUxfPmDgJdKLUGv8PsN6x32tlQGUCOig74bssIN5VdsC049px8Fk1kgEDRIvJcCSSTw5D4iGz1ANx6sdcYm2RovPkFLJ7xgTx8Zj9D5q7zG3ghYStG-HeWsLSIL47jLJ2vuOinM__TIK3QToiBCa1B0wAcyz0YMy1SmcDPJJPjOVJrriq",
    priority: "medium"
  },
  {
    id: 2,
    title: "Noise complaint",
    status: "pending",
    reportedDate: "2023-09-10",
    description: "Excessive noise from construction site during night hours",
    location: "Mission District",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDhw3IGs5WT7wB0oyJl1JPiCcQlz5pn-SefZHAj1Ed-nBwpIqE2KjDwJMcUyOvuVvZZarhwjGRRHuHGhZEINzFWcvCyATaL_QEKRsCdh75xplYFkUO5EomlqFvscv2BBnSLpG8nqjMcctinu9EQlb8ijENIggyR2Ago5rz0sNkW5dN8BAN7VAU-jyThDUkqVxkwMQ4uMtFw1iGTOz2tplXxCYdUl7uc5e5c1lTTbOo4QumgfX_ib2Q8dF5n0xHFOWPuE_suRbAhfxl",
    priority: "high"
  },
  {
    id: 3,
    title: "Illegal parking",
    status: "solved",
    reportedDate: "2023-09-05",
    description: "Vehicle blocking fire hydrant access",
    location: "Market Street",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBknzdglaiXvkJ_rQJ1gNgzzMwEjojlLQpKz3xd1khM7EnGCVEz5BYgHozheQJraWgind9dXMGK84gJdzfefjvyERM0b1N_qQqBzY31KsoC5bsQt-N8iey609ERNT9k8F556igvwitEBQOvWO6LTgITn_f7IXhIPBLpzZQilSMcTKVxLIfOeP9AiefwMGmLbFPNAhnXLGF8dbd8ynTaFh0CBJfvtt8SuYc2iCmkbN-K7JGZdXOgwYaoTvLxP88KgT1xOZXuDTX7l9O9",
    priority: "medium"
  },
  {
    id: 4,
    title: "Pothole on Main Street",
    status: "in-progress",
    reportedDate: "2023-09-20",
    description: "Large pothole causing damage to vehicles",
    location: "Main Street & Oak Avenue",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5WL8lkWbdhhOiS8GhmLv02f2bpXbFyjNUeGJ0wKlAya3_icRxru-HzUWT_aoss73vO3-PDlYCQlfQL0iiX6gES_UXnpwopMF3UeLYgT4M-hkBBH-XNzCpYS5hcMkBIF0pA_6H7Fmc657fetluCMezqRfQMFqa6mO1cSCOr3ETyo13CIc637_R6JrerFBpoFhnNnGwML5iqThD-km0GL4jtqFtSo2FQF3XYvr6dgsu-jETb2wVtoy3BKiHy-WFKHZRZ8vhyURaHg",
    priority: "high"
  },
  {
    id: 5,
    title: "Broken street light",
    status: "pending",
    reportedDate: "2023-09-18",
    description: "Street light not functioning, creating safety hazard",
    location: "Valencia Street",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfvvYT6h115b_smaVpnZNVsOx4YqH02D_ymlmvNZMVX6c02u5eY80Qc6DcvQaKtms7lyYGFAwUSzdNV0RXpg82R_yNOA8NsTfx_8C9EzxWIN5UMlBvhj74XysMfeaJhv86RhWJbg45801IVPj3ivfCoioC3XfQQqVNScMuKOokJrLaDaSxbySZqPgseziWbuJz0C-99JiHpP1AjThcRzqRkM1fG8TvL4vqshTLTY7wPS7SPuYF7wThpqWlhUN4gFWN-N8w97-y8Q",
    priority: "medium"
  },
  {
    id: 6,
    title: "Trash accumulation",
    status: "in-progress",
    reportedDate: "2023-09-22",
    description: "Uncollected trash bins for over a week",
    location: "Castro District",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0FtOjxyarrQ_2eDoZ262JchQlURpyIQPCIki9FZpcPaON05XCGo3nj43HHyGppWvbSD_fNHaIKA-MTfOa4UFq5NieHkpBUxfPmDgJdKLUGv8PsN6x32tlQGUCOig74bssIN5VdsC049px8Fk1kgEDRIvJcCSSTw5D4iGz1ANx6sdcYm2RovPkFLJ7xgTx8Zj9D5q7zG3ghYStG-HeWsLSIL47jLJ2vuOinM__TIK3QToiBCa1B0wAcyz0YMy1SmcDPJJPjOVJrriq",
    priority: "low"
  },
  {
    id: 7,
    title: "Damaged sidewalk",
    status: "solved",
    reportedDate: "2023-09-12",
    description: "Cracked and uneven sidewalk causing tripping hazard",
    location: "Haight Street",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBknzdglaiXvkJ_rQJ1gNgzzMwEjojlLQpKz3xd1khM7EnGCVEz5BYgHozheQJraWgind9dXMGK84gJdzfefjvyERM0b1N_qQqBzY31KsoC5bsQt-N8iey609ERNT9k8F556igvwitEBQOvWO6LTgITn_f7IXhIPBLpzZQilSMcTKVxLIfOeP9AiefwMGmLbFPNAhnXLGF8dbd8ynTaFh0CBJfvtt8SuYc2iCmkbN-K7JGZdXOgwYaoTvLxP88KgT1xOZXuDTX7l9O9",
    priority: "medium"
  },
  {
    id: 8,
    title: "Abandoned vehicle",
    status: "pending",
    reportedDate: "2023-09-24",
    description: "Car abandoned on residential street for 3 weeks",
    location: "Richmond District",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDhw3IGs5WT7wB0oyJl1JPiCcQlz5pn-SefZHAj1Ed-nBwpIqE2KjDwJMcUyOvuVvZZarhwjGRRHuHGhZEINzFWcvCyATaL_QEKRsCdh75xplYFkUO5EomlqFvscv2BBnSLpG8nqjMcctinu9EQlb8ijENIggyR2Ago5rz0sNkW5dN8BAN7VAU-jyThDUkqVxkwMQ4uMtFw1iGTOz2tplXxCYdUl7uc5e5c1lTTbOo4QumgfX_ib2Q8dF5n0xHFOWPuE_suRbAhfxl",
    priority: "low"
  }
];

// Calculate statistics
function calculateStats() {
  const total = reportsData.length;
  const solved = reportsData.filter(r => r.status === 'solved').length;
  const pending = reportsData.filter(r => r.status === 'pending').length;
  const inProgress = reportsData.filter(r => r.status === 'in-progress').length;
  
  return {
    total,
    solved,
    pending,
    inProgress,
    solvedPercentage: Math.round((solved / total) * 100)
  };
}

// Filter reports by status
function filterReports(status) {
  if (status === 'all') {
    return reportsData;
  }
  
  const statusMap = {
    'reported': ['pending', 'in-progress'],
    'pending': 'pending',
    'in-progress': 'in-progress',
    'solved': 'solved'
  };
  
  if (Array.isArray(statusMap[status])) {
    return reportsData.filter(r => statusMap[status].includes(r.status));
  }
  
  return reportsData.filter(r => r.status === statusMap[status]);
}

// Render reports list
function renderReports(reports, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  reports.forEach(report => {
    const statusColor = {
      'solved': '#22c55e',
      'pending': '#eab308',
      'in-progress': '#3b82f6'
    }[report.status];
    
    const statusText = {
      'solved': 'Solved',
      'pending': 'Pending',
      'in-progress': 'In Progress'
    }[report.status];
    
    const reportCard = `
      <div class="report-card">
        <div class="report-thumb" style="background-image: url('${report.image}');"></div>
        <div class="flex-1">
          <p class="font-bold">${report.title}</p>
          <p class="text-sm mt-1" style="color: #6b7280;">
            <span class="font-medium" style="color: ${statusColor};">Status: ${statusText}</span>
          </p>
          <p class="text-xs mt-1" style="color: #9ca3af;">Reported on ${report.reportedDate}</p>
        </div>
        <button class="delete-btn" onclick="deleteReport(${report.id})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    `;
    
    container.innerHTML += reportCard;
  });
}

// Delete report
function deleteReport(id) {
  if (confirm('Are you sure you want to delete this report?')) {
    const index = reportsData.findIndex(r => r.id === id);
    if (index !== -1) {
      reportsData.splice(index, 1);
      
      // Re-render based on current filter
      const activeFilter = document.querySelector('.filter-label:has(input:checked)');
      if (activeFilter) {
        const filterValue = activeFilter.querySelector('input').value.toLowerCase();
        renderReports(filterReports(filterValue), 'reports-container');
      }
      
      // Update stats
      updateStats();
    }
  }
}

// Update statistics display
function updateStats() {
  const stats = calculateStats();
  
  const totalElement = document.getElementById('total-solved');
  if (totalElement) {
    totalElement.textContent = `${stats.solved}`;
  }
  
  const totalCases = document.getElementById('total-cases');
  if (totalCases) {
    totalCases.textContent = `${stats.total} Total Cases`;
  }
  
  const pendingCount = document.getElementById('pending-count');
  if (pendingCount) {
    pendingCount.textContent = `${stats.pending} Pending`;
  }
  
  const inProgressCount = document.getElementById('in-progress-count');
  if (inProgressCount) {
    inProgressCount.textContent = `${stats.inProgress} In Progress`;
  }
}

// Setup filter listeners
function setupFilters() {
  const filterInputs = document.querySelectorAll('input[name="status-filter"]');
  
  filterInputs.forEach(input => {
    input.addEventListener('change', function() {
      const filterValue = this.value.toLowerCase();
      const filtered = filterReports(filterValue);
      renderReports(filtered, 'reports-container');
    });
  });
}

// Profile Editing
function enableProfileEdit(field) {
  const editableFields = {
    'phone': document.getElementById('profile-phone'),
    'email': document.getElementById('profile-email')
  };
  
  const fieldElement = editableFields[field];
  if (!fieldElement) return;
  
  const currentValue = fieldElement.textContent;
  const input = document.createElement('input');
  input.type = field === 'email' ? 'email' : 'tel';
  input.value = currentValue;
  input.className = 'form-input';
  input.style.height = '2.5rem';
  
  fieldElement.replaceWith(input);
  input.focus();
  
  input.addEventListener('blur', function() {
    userProfile[field] = this.value;
    const span = document.createElement('p');
    span.id = `profile-${field}`;
    span.className = 'text-sm text-secondary';
    span.textContent = this.value;
    this.replaceWith(span);
  });
  
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      this.blur();
    }
  });
}

// Toggle Profile Visibility
function toggleProfileVisibility(checkbox) {
  userProfile.profileVisible = checkbox.checked;
  
  const visibilityText = document.getElementById('visibility-status');
  if (visibilityText) {
    visibilityText.textContent = checkbox.checked ? 'Visible to everyone' : 'Only visible to you';
  }
  
  // Show confirmation
  showNotification(checkbox.checked ? 'Profile is now public' : 'Profile is now private');
}

// Report Incident
function submitIncident() {
  const description = document.getElementById('incident-description');
  const location = document.getElementById('report-location');
  const tags = getSelectedTags();
  
  if (!description || !description.value.trim()) {
    showNotification('Please describe the incident', 'error');
    return;
  }
  
  // Create new report
  const newReport = {
    id: reportsData.length + 1,
    title: description.value.substring(0, 50) + '...',
    status: 'pending',
    reportedDate: new Date().toISOString().split('T')[0],
    description: description.value,
    location: location ? location.value : userLocation.city,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5WL8lkWbdhhOiS8GhmLv02f2bpXbFyjNUeGJ0wKlAya3_icRxru-HzUWT_aoss73vO3-PDlYCQlfQL0iiX6gES_UXnpwopMF3UeLYgT4M-hkBBH-XNzCpYS5hcMkBIF0pA_6H7Fmc657fetluCMezqRfQMFqa6mO1cSCOr3ETyo13CIc637_R6JrerFBpoFhnNnGwML5iqThD-km0GL4jtqFtSo2FQF3XYvr6dgsu-jETb2wVtoy3BKiHy-WFKHZRZ8vhyURaHg',
    priority: 'medium',
    tags: tags
  };
  
  reportsData.push(newReport);
  
  // Redirect to success page
  window.location.href = './ReportIncidentSucess.html';
}

function getSelectedTags() {
  const tagButtons = document.querySelectorAll('.tag-primary');
  return Array.from(tagButtons).map(btn => btn.textContent.trim().replace('close', '').trim());
}

function addTag() {
  const tagContainer = document.getElementById('tags-container');
  if (!tagContainer) return;
  
  const newTag = prompt('Enter tag name:');
  if (!newTag || !newTag.trim()) return;
  
  const tagButton = document.createElement('button');
  tagButton.className = 'tag tag-primary';
  tagButton.innerHTML = `
    ${newTag.trim()}
    <span class="material-symbols-outlined text-base ml-1" onclick="this.parentElement.remove()">close</span>
  `;
  
  tagContainer.insertBefore(tagButton, tagContainer.lastElementChild);
}

function removeTag(button) {
  button.parentElement.remove();
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${type === 'error' ? '#ef4444' : '#22c55e'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  // Detect location
  detectLocation();
  
  // Check if we're on the reports page
  if (document.getElementById('reports-container')) {
    const initialFilter = document.querySelector('input[name="status-filter"]:checked');
    const filterValue = initialFilter ? initialFilter.value.toLowerCase() : 'reported';
    
    renderReports(filterReports(filterValue), 'reports-container');
    updateStats();
    setupFilters();
  }
  
  // Setup OTP inputs
  if (document.querySelector('.otp-input')) {
    setupOTPInputs();
  }
  
  // Setup search
  setupSearch();
  
  // Setup profile visibility toggle
  const visibilityToggle = document.getElementById('visibility-toggle');
  if (visibilityToggle) {
    visibilityToggle.checked = userProfile.profileVisible;
  }
  
  // Setup leaderboard
  if (document.getElementById('leaderboard-container')) {
    setupLeaderboard();
  }
}

// Leaderboard Functions
function setupLeaderboard() {
  const tabs = document.querySelectorAll('.tab-link');
  let currentPeriod = 'weekly';
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      currentPeriod = this.textContent.trim().toLowerCase().replace(' ', '');
      renderLeaderboard(currentPeriod);
    });
  });
  
  renderLeaderboard(currentPeriod);
}

function renderLeaderboard(period) {
  const container = document.getElementById('leaderboard-container');
  if (!container) return;
  
  const data = leaderboardData[period] || leaderboardData.weekly;
  
  container.innerHTML = data.map((user, index) => {
    const rank = index + 1;
    const displayName = user.profileVisible ? user.name : 'Anonymous User';
    const displayAvatar = user.profileVisible ? user.avatar : anonymousAvatar;
    const displayInfo = user.profileVisible ? 
      `${user.points} points • ${user.reportsSubmitted} reports` : 
      `${user.points} points`;
    
    // Medal for top 3
    let rankDisplay = `<span class="rank-number">${rank}</span>`;
    if (rank === 1) {
      rankDisplay = `<span class="rank-number" style="color: #fbbf24; font-size: 1.25rem;">🥇</span>`;
    } else if (rank === 2) {
      rankDisplay = `<span class="rank-number" style="color: #9ca3af; font-size: 1.25rem;">🥈</span>`;
    } else if (rank === 3) {
      rankDisplay = `<span class="rank-number" style="color: #cd7f32; font-size: 1.25rem;">🥉</span>`;
    }
    
    return `
      <li class="leaderboard-item">
        ${rankDisplay}
        <img 
          alt="${displayName}'s profile picture" 
          class="leaderboard-avatar" 
          src="${displayAvatar}"
          style="${!user.profileVisible ? 'opacity: 0.6;' : ''}"
        />
        <div class="flex-1">
          <p class="font-bold" style="${!user.profileVisible ? 'color: #9ca3af;' : ''}">${displayName}</p>
          <p class="text-sm text-secondary">${displayInfo}</p>
        </div>
        ${!user.profileVisible ? '<span class="material-symbols-outlined text-sm" style="color: #9ca3af;">lock</span>' : ''}
      </li>
    `;
  }).join('');
}

// OTP Input functionality
function setupOTPInputs() {
  const otpInputs = document.querySelectorAll('.otp-input');
  
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function(e) {
      if (this.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
    
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && this.value === '' && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });
}

// Like/Unlike functionality
let likedPosts = new Set();

function toggleLike(postId) {
  const likeBtn = document.querySelector(`[data-post-id="${postId}"] .like-btn`);
  const likeCount = document.querySelector(`[data-post-id="${postId}"] .like-count`);
  
  if (!likeBtn || !likeCount) return;
  
  if (likedPosts.has(postId)) {
    likedPosts.delete(postId);
    likeBtn.classList.remove('liked');
    likeCount.textContent = parseInt(likeCount.textContent) - 1;
  } else {
    likedPosts.add(postId);
    likeBtn.classList.add('liked');
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  }
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('search-incidents');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Implement search logic here
    console.log('Searching for:', searchTerm);
  });
}
