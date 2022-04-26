const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const LoginSchema = new mongoose.Schema({
    fname: {
      type: String,
      required: [true, "First name is required"],
      minlength:3
    },
    lname: {
      type: String,
      required: [true, "Last name is required"],
      minlength:3
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique:true,
      validate: {
        //(val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val)
        //
        validator: val => /^[\w-]+(\.[\w-]+)+@[udla]+(\.[edu]+)*(\.[ec]{2,})$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be 8 character or longer"],
    },
  },{ timestamps: true });

  // uso de virtual --> es un campo que se llena pero no se guarda en la base de datos.
LoginSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

//uso del gancho pre --> para validar la contrasena con la contrasena ingresada virtualmente
LoginSchema.pre('validate', function(next) {
  if(this.password !== this.confirmPassword){
    this.invalidate('confirmPassword','Password must match confirm password')
  }
  next();
});

// uso del gancho pre ---> antes de que el usuario se guarde en la base de datos hace un hash a la contrasena
// desencadena el pre-validate
LoginSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10)
  .then(hash => {
    this.password = hash;
    next();
  });
});

const Auth = mongoose.model("Auth", LoginSchema);
module.exports = Auth;



