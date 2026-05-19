import PackageModel from "../models/Package.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import { PackageCollectionModel } from "../model/Package.js";


// ADD PACKAGE
// ADD PACKAGE
export const addPackage = async (req,res)=>{

try{

const newPackage = new PackageCollectionModel({

title:req.body.title,

destination:req.body.destination,

price:req.body.price,

description:req.body.description,

images: req.file ? [req.file.filename] : []

})

await newPackage.save()

res.json({
success:true,
message:"Package Added"
})

}catch(err){

console.log(err)

res.status(500).json({
success:false,
message:"Server Error"
})

}

}



// GET PACKAGES
export const getPackages = async(req,res)=>{

try{

const data = await PackageCollectionModel.find()

res.json({
success:true,
data:data
})

}catch(err){

res.status(500).json(err)

}

}



// ADD HOTEL
export const addHotel = async(req,res)=>{

try{

const hotel = new Hotel(req.body)

await hotel.save()

res.json({
success:true,
message:"Hotel Added"
})

}catch(err){
res.status(500).json(err)
}

}



// GET HOTELS
export const getHotels = async(req,res)=>{

try{

const hotels = await Hotel.find()

res.json({
success:true,
data:hotels
})

}catch(err){
res.status(500).json(err)
}

}



// ADD ROOM
export const addRoom = async(req,res)=>{

try{

const room = new Room(req.body)

await room.save()

res.json({
success:true,
message:"Room Added"
})

}catch(err){
res.status(500).json(err)
}

}



// BOOKINGS
export const getBookings = async(req,res)=>{

try{

const bookings = await Booking.find()

res.json({
success:true,
data:bookings
})

}catch(err){
res.status(500).json(err)
}

}