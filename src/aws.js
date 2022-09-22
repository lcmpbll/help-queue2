import * as AWS from 'aws-sdk'
import { ConfigurationOptions } from 'aws-sdk'

const configurationOptions = {
    region: process.env.YOUR_REGION,
    secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
    accessKeyId: process.env.YOUR_ACCESS_ID
}

AWS.config.update(configuration)