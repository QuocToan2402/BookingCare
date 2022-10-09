export const adminMenu = [
  {
    //manager user

    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },
      {
        name: "menu.admin.crud-redux",
        link: "/system/admin-manage",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.product-manage",
        //     link: "/system/user-redux",
        //   },
        // ],
      },
      // {
      //   name: "menu.admin.manage-admin",
      //   link: "/system/user-admin",
      // }, name: "menu.doctor.manage-schedule",

      {
        //manager user

        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //quan ly phong kham

    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
      {
        name: "menu.admin.manage-clinic-list",
        link: "/system/manage-clinic-list",
      },
    ],
  },
  {
    //quan ly phong kham

    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
      {
        name: "menu.admin.manage-specialty-list",
        link: "/system/manage-specialty-list",
      },
    ],
  },
  {
    //quan ly handbook

    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
      {
        name: "menu.admin.manage-handbook-list",
        link: "/system/manage-handbook-list",
      },
    ],
  },
];
export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //manager user

        name: "menu.doctor.manage-schedule",

        link: "/doctor/manage-schedule",
      },
      {
        //manager user
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
