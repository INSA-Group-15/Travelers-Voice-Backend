import helmet from "helmet";

const helmetMW = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      imgSrc: ["'self'", "data:"],
    },
  },

  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "same-origin" },

  hsts: {
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true,
  },

  hidePoweredBy: true,
  noSniff: true,
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "no-referrer" },
  ieNoOpen: true,
  dnsPrefetchControl: { allow: false },

  permittedCrossDomainPolicies: { permittedPolicies: "none" },
});

export default helmetMW;
