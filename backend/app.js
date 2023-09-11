const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

// const corsOptions = {
//   origin: ['https://stone-crusher-erp-base.vercel.app'],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// };
// app.use(cors(corsOptions));

// origin: ['https://stone-crusher-erp-base.vercel.app', 'http://localhost:3000'],
// origin: ['https://stone-crusher-erp-base.vercel.app', 'http://localhost:3000'],
// origin: 'https://stone-crusher-erp-base.vercel.app',
// app.use(
//   cors({
//     origin: ["https://stone-crusher-erp-frontend.vercel.app", "http://localhost:3000"],
//     methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "HEAD"],
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "HEAD"],
//     credentials: true,
//   })
// );

// app.use(
//   cors({
//     origin: ["https://stone-crusher-erp-frontend.vercel.app", "http://localhost:3000"],
//     methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "HEAD"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: ["https://stone-crusher-erp-frontend.vercel.app", "http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "HEAD"],
    credentials: true,
  })
);
// const allowedOrigins = ['https://stone-crusher-erp-base.vercel.app'];
// const allowedOrigins = ['http://localhost:3000'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use('/test', (req, res) => {
  res.send('Hello world!');
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,

    limit: '50mb',
  })
);

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require('./controller/user');
const unitmaster = require('./controller/unitmaster');
const customer = require('./controller/customer');
const vendormaster = require('./controller/vendorMaster');
const driverMaster = require('./controller/driverMaster');
const materialmaster = require('./controller/material');
const vehicle = require('./controller/vehicle');
const destination = require('./controller/destination');
const loadType = require('./controller/loadType');
const sourcemaster = require('./controller/source');
const materialrate = require('./controller/materialrate');
const loaderMaster = require('./controller/loadermaster');
const supplier = require('./controller/supplier');

const petrolPump = require('./controller/petrolPump');
const employee = require('./controller/employee');
const transport = require('./controller/transport');
const fuelExpense = require('./controller/fuelExpense');

const paymentRecived = require('./controller/paymentRecived');
const Payment = require('./controller/paymentAmount');
const expenses = require('./controller/expenses');
const maintanance = require('./controller/maintanance');
const challan = require('./controller/challanEntry');
const miningRoyalty = require("./controller/miningRoyalty");

app.use('/api/v2/user', user);
app.use('/api/v2/challan', challan);
app.use('/api/v2/unitmaster', unitmaster);
app.use('/api/v2/customer', customer);
app.use('/api/v2/vendormaster', vendormaster);
app.use('/api/v2/driverMaster', driverMaster);
app.use('/api/v2/vehicle', vehicle);
app.use('/api/v2/materialmaster', materialmaster);
app.use('/api/v2/destinationmaster', destination);
app.use('/api/v2/loadTypemaster', loadType);
app.use('/api/v2/source', sourcemaster);
app.use('/api/v2/materialrate', materialrate);
app.use('/api/v2/loaderMaster', loaderMaster);
app.use('/api/v2/supplier', supplier);
app.use('/api/v2/petrolPump', petrolPump);
app.use('/api/v2/employee', employee);
app.use('/api/v2/transport', transport);
app.use("/api/v2/miningRoyalty", miningRoyalty);

app.use('/api/v2/expenses', expenses);
app.use('/api/v2/maintanance', maintanance);

app.use('/api/v2/paymentrecived', paymentRecived);
app.use('/api/v2/payment', Payment);

app.use('/api/v2/fuelExpense', fuelExpense);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
