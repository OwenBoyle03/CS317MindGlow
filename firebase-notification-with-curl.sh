curl -d '{
  "to": "<Replace this with token outputted via console.log on webpage>",
   "notification": {
     "title" : " This is my title new ",
     "body" : " This is the body of my message "
   }
}' \
-i -H "Application/json" \
-H "Content-type: application/json" \
-H "Authorization: key=AAAAnIaBS5Y:APA91bHlKJRcBTO52YcOPHuOYUw3XB9dBKpPDdhLD4QBYBucPjL2QKctbl40qnmJzTow4UXtIalPfp4XIwCWHOf2czNqtZ673Nwuj3ZbJ6Gpmr8V10KQohmVrljFC_NgBx4_LstqW7Dh" \
-X POST https://fcm.googleapis.com/fcm/send