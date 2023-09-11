import { Grid } from "@material-ui/core";
import React from "react";
import StatCard from "../components/IndividualComponent/StatCard";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Email, NotificationImportant, PhonelinkLockOutlined } from "@material-ui/icons";

export default function ScDashboard() {
  return <div>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} md={2}>
        <StatCard
          type="fill"
          title="Customer"
          value={30}
          icon={<LocalOfferIcon />}
          color="#3f51b5"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <StatCard
          type="fill"
          title="Supplier"
          value={10}
          icon={<LocalOfferIcon />}
          color="#3f51b5"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <StatCard
          type="fill"
          title="Dues"
          value={`1,101,712.00`}
          icon={<PhonelinkLockOutlined />}
          color="#9c27b0"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <StatCard
          type="fill"
          title="Payable"
          value={`1,700,712.00`}
          icon={<PhonelinkLockOutlined />}
          color="#9c27b0"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <StatCard
          type="fill"
          title="Expenses"
          value={`40,712.00`}
          icon={<NotificationImportant />}
          color="#f44336"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <StatCard
          type="fill"
          title="SMS"
          value={140}
          icon={<Email />}
          color="#ffd740"
        />
      </Grid>
    </Grid>

  </div>;
}
