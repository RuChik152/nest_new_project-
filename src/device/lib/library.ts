import axios, { AxiosRequestConfig } from "axios";
import { LinkPicsGenerateResponse } from "../types/device.types";

const linkPicsToken = "aid_YIJEJGAX619B6NE27QZSKQ7IO3H0LX9QCJKBZZ6V3CYAJUEYZUTIIGVL5S2JLCS4IN4IPI32WC1"
const linkPicsCount = 3

export async function generateEmoji(activateCode: string) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "https://dev.link.pics/api/v1/code-data/generate/",
    headers: {
      "Authorization":`App ${linkPicsToken}`,
    },
    data: {
      data: activateCode,
      count: linkPicsCount
    }
  }

  const response = await axios(config)
  const lincPicsData: LinkPicsGenerateResponse = response.data
  return lincPicsData
}
