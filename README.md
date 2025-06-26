# 🧾 Community Savings Group Tracker – _Prototype_

This is a **React-based prototype** for a **Community Savings Group Tracker**, designed to help local savings groups (like Equbs or Rotating Savings and Credit Associations) manage and track their group details, members, and contributions in an intuitive and user-friendly interface.

---

## 🌟 Purpose

Community savings groups provide accessible financial support for their members, especially in areas where traditional banking services are limited. This app prototype aims to **digitize and simplify** the management process of these groups, ensuring better organization, transparency, and convenience.

---

## ✨ Features

### 🏠 Homepage (Dashboard)

- Displays a list of all created savings groups.
- Each group is shown as a **clickable tile** displaying:
  - **Group name**
  - **Number of members**
  - **Quick access buttons**: `Edit` and `Delete`.

### 🔍 Group Details Page

- View **full details** of a group including:
  - Name
  - Description
  - Creation date
  - List of all members and their contact information.

### ✏️ Edit Group Page

- Pre-filled form with existing group information.
- Fully **editable fields** for:
  - Group name
  - Description
  - Member names and phone numbers.
- **Add new members** via a dialog interface:
  - Input how many members to add.
  - Dynamically generate input fields for new names and phone numbers.
  - Merges added members into the existing list.
- **Delete individual members** from the group.
- **Save changes** to update the group list and navigate back to the details page.

### 🗑️ Delete Functionality

- Safely delete an entire group from the homepage list with a confirmation prompt.
- Safely remove members from groups with a confirmation prompt.

---

## ⚙️ Tech Stack

- **React** – for building reusable UI components.
- **React Router DOM** – for routing and navigation.
- **Context API** – for shared global state management.
- **CSS** – for styling and layout.
- **crypto.randomUUID()** – for generating unique IDs for groups and members.
- **Local Storage** - for storing groups and their information persistently.

---

## 🧪 Current Limitations

- ❌ No validation on phone numbers or member names.
- ❌ No authentication or user role separation (e.g., admin/member).

---

## 🔮 Future Improvements (Roadmap Ideas)

- 🔐 Introduce authentication for secure group management.
- 💸 Add transaction tracking (weekly contributions, penalties, payouts).
- 📆 Calendar for contribution schedules and reminders.
- 📱 Mobile-first UI enhancements and potential migration to **React Native**.

---

## 🧑‍💻 Author

Developed with care by **Saron Abebe** — aspiring full-stack developer passionate about building impactful digital solutions for local communities.

---

> 💡 _This is an early-stage prototype intended for testing core functionalities and UI behavior. Feedback and contributions are welcome!_
