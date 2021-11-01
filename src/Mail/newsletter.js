const nodemailer = require('nodemailer');
const { MAIL_HOST, MAIL_PORT, MAIL_PASSWORD } = process.env;

function sendNewsletter(from, sender, recipient, subject, content, newsletterText){

    const transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        auth: {
            user: `${sender}`,
            pass: MAIL_PASSWORD
        }
    });

    transporter.sendMail({
        from: `${from} <${sender}>`,
        bcc: `${recipient}`,
        subject: `${subject}`,
        text: `${content}`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta charset="utf-8"> <!-- utf-8 works for most cases -->
            <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
            <title> ${subject} </title> <!-- The title tag shows in email notifications, like Android 4.4. -->
 
            <!-- Web Font / @font-face : BEGIN -->
            <!-- NOTE: If web fonts are not required, lines 9 - 26 can be safely removed. -->
            
            <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
            <!--[if mso]>
                <style>
                    * {
                        font-family: sans-serif !important;
                    }
                </style>
            <![endif]-->
            
            <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
            <!--[if !mso]><!-->
                <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
            <!--<![endif]-->
        
            <!-- Web Font / @font-face : END -->
            
            <!-- CSS Reset -->
            <style type="text/css">
        
                /* What it does: Remove spaces around the email design added by some email clients. */
                /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
                html,
                body {
                    margin: 0 auto !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                }
                
                /* What it does: Stops email clients resizing small text. */
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
                
                /* What is does: Centers email on Android 4.4 */
                div[style*="margin: 16px 0"] {
                    margin:0 !important;
                }
                
                /* What it does: Stops Outlook from adding extra spacing to tables. */
                table,
                td {
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }
                        
                /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */
                table {
                    border-spacing: 0 !important;
                    border-collapse: collapse !important;
                    table-layout: fixed !important;
                    Margin: 0 auto !important;
                }
                table table table {
                    table-layout: auto; 
                }
                
                /* What it does: Uses a better rendering method when resizing images in IE. */
                img {
                    -ms-interpolation-mode:bicubic;
                }
                
                /* What it does: A work-around for iOS meddling in triggered links. */
                .mobile-link--footer a,
                a[x-apple-data-detectors] {
                    color:inherit !important;
                    text-decoration: underline !important;
                }
              
            </style>
            
            <!-- Progressive Enhancements -->
            <style>
                
                /* What it does: Hover styles for buttons */
                .button-td,
                .button-a {
                    transition: all 100ms ease-in;
                    cursor: pointer;
                }
                .button-td:hover,
                .button-a:hover {
                    background: #08751f !important;
                    border-color: #08751f !important;
                }
        
                /* Media Queries */
                @media screen and (max-width: 600px) {
        
                    .email-container {
                        width: 100% !important;
                        margin: auto !important;
                    }
        
                    /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */
                    .fluid,
                    .fluid-centered {
                        max-width: 100% !important;
                        height: auto !important;
                        Margin-left: auto !important;
                        Margin-right: auto !important;
                    }
                    /* And center justify these ones. */
                    .fluid-centered {
                        Margin-left: auto !important;
                        Margin-right: auto !important;
                    }
        
                    /* What it does: Forces table cells into full-width rows. */
                    .stack-column,
                    .stack-column-center {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        direction: ltr !important;
                    }
                    /* And center justify these ones. */
                    .stack-column-center {
                        text-align: center !important;
                    }
                
                    /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */
                    .center-on-narrow {
                        text-align: center !important;
                        display: block !important;
                        Margin-left: auto !important;
                        Margin-right: auto !important;
                        float: none !important;
                    }
                    table.center-on-narrow {
                        display: inline-block !important;
                    }
                        
                }
        
            </style>

            
        </head>
        <body bgcolor="#222222" width="100%" style="Margin: 0;">
            <center style="width: 100%; background: white;">
        
                <!-- Visually Hidden Preheader Text : BEGIN -->
       
                <!-- Visually Hidden Preheader Text : END -->
        
                <!-- Email Header : BEGIN -->
                <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto;" class="email-container">
                    <tr>
                        <td style="padding: 20px 0; text-align: center">
                            <img src="https://i.imgur.com/Vnk8aCi.jpg" width="200" height="50" alt="alt_text" border="0">
                        </td>
                    </tr>
                </table>
                <!-- Email Header : END -->
                
                <!-- Email Body : BEGIN -->
                <table cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#ffffff" width="600" style="margin: auto;" class="email-container">
                    
                    <!-- Hero Image, Flush : BEGIN -->
                    <tr>
                        <td>
                            <img src="https://i.imgur.com/OcP89Zq.jpg" width="600" height="" alt="alt_text" border="0" align="center" style="width: 100%; max-width: 600px;">
                        </td>
                    </tr>
                    <!-- Hero Image, Flush : END -->
        
                    <!-- 1 Column Text : BEGIN -->
                    <tr>
                        <td style="padding: 40px; text-align: center; font-family: sans-serif; font-size: 15px; mso-height-rule: exactly; line-height: 20px; color: #555555;">
                            <h3> Novidades chegando!</h3> 
                              ${newsletterText} 💚
                            <br><br>
                            <!-- Button : Begin -->
                            <table cellspacing="0" cellpadding="0" border="0" align="center" style="Margin: auto">
                                <tr>
                                    <td style="border-radius: 3px; background: #37dd5b; text-align: center;" class="button-td">
                                        <a href="https://conversordemoeda.xyz" target="_blank" style="background: #37dd5b; border: 15px solid #37dd5b; font-family: sans-serif; font-size: 13px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 3px; font-weight: bold;" class="button-a">
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:white">Acessar site</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <!-- Button : END -->
                        </td>
                    </tr>
                    <!-- 1 Column Text : BEGIN -->
        
                    <!-- Background Image with Text : BEGIN -->
          
                    <!-- Background Image with Text : END -->
                   
                    <!-- 2 Even Columns : BEGIN -->
        
                    <!-- 2 Even Columns : END -->
        
                    <!-- 3 Even Columns : BEGIN -->
            
                    <!-- 3 Even Columns : END -->
                    
                    <!-- Thumbnail Left, Text Right : BEGIN -->
        
                    <!-- Thumbnail Left, Text Right : END -->
        
                    <!-- Thumbnail Right, Text Left : BEGIN -->
           
                    <!-- Thumbnail Right, Text Left : END -->
        
                </table>
                <!-- Email Body : END -->
                  
                <!-- Email Footer : BEGIN -->
                <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto;" class="email-container">
                    <tr>
                        <td style="padding: 40px 10px;width: 100%;font-size: 12px; font-family: sans-serif; mso-height-rule: exactly; line-height:18px; text-align: center; color: #888888;">
                            Conversor de moeda<br><span class="mobile-link--footer">Plataforma para a verificação de cotações e câmbios</span><br><span class="mobile-link--footer"></span>
                            <br><br> 

                            <a  href="https://conversordemoeda.xyz/cancelar/newsletter/${recipient}" target="_blank">
                                <unsubscribe style="color:#888888; text-decoration:underline; cursor: pointer;">Cancelar inscrição newsletter</unsubscribe>
                            </a>
                           
                        </td>
                    </tr>
                </table>
                <!-- Email Footer : END -->
        
            </center>

            

        </body>
        </html>
        `
    }).then((message) => {
        console.log(message);
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = sendNewsletter;