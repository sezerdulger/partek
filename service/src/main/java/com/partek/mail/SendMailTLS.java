package com.partek.mail;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.TimeZone;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfDiv.BorderTopStyle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.sdulger.app.ServiceApplicationConfig;
import com.sdulger.model.ServiceForm;
import com.sdulger.util.FileUtil;

@Component
public class SendMailTLS {
	/*
	public static void main(String[] args) {
		
		final String username = "teknikservis@partekbilisim.com";
		final String password = "Papo7170";
		
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.office365.com");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.user", username);
		
		//Session session = Session.getInstance(props);
		
		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
		
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("teknikservis@partekbilisim.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("sezerdulger@gmail.com"));
			message.setSubject("Teknik Servis Formu");
			
			MimeBodyPart messageBodyPart = new MimeBodyPart();

			String body = "sezer";
			
			
			// Now set the actual message
			messageBodyPart.setContent(body, "text/html; charset=utf-8");
			//messageBodyPart.attachFile(signaturePath);


			Multipart multipart = new MimeMultipart();
			// Set text message part
			multipart.addBodyPart(messageBodyPart);
			message.setContent(multipart);
			Transport.send(message);
			System.out.println(session.getStore());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}*/
	@Autowired
	ServiceApplicationConfig config;
	
	public void initialize() {
		logoPath = config.temppath + "/logo.png";
		signaturePath = config.temppath + "/imza.html";
		signatureImagePath = config.temppath + "/imza.png";
		clearImagePath = config.temppath + "/cleardot.gif";
	}
	
	public String address;
	
	public String body = "";
	
	//String basePath = "C:\\Users\\software\\Desktop\\data\\";
	String logoPath;
	String signaturePath;
	String signatureImagePath;
	String clearImagePath;
	public String send(ServiceForm form, List<String> emails) {
		
		final String username = "teknikservis@partekbilisim.com";
		//final String password = "T.2016*";
		//final String password = "Papo7170";
		final String password = "Soha2528";
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		//props.put("mail.smtp.starttls.enable", "false");
		// props.put("mail.smtp.host", "mail.partekbilisim.com");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.office365.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		//String toEmail = "erhandulger16@gmail.com,e.dulger@partekbilisim.com,sezerdulger@gmail.com,";
		String toEmail = "s.kahraman@partekbilisim.com,";
		for (String email : emails) {
			toEmail += email + ",";
		}
		
		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("teknikservis@partekbilisim.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
			message.setSubject("Teknik Servis Formu");

			// Create a multipar message
						Multipart multipart = new MimeMultipart();
			
			// Create the message part
			MimeBodyPart messageBodyPart = new MimeBodyPart();

			body = FileUtil.readFile(signaturePath);
			
			
			// Now set the actual message
			messageBodyPart.setContent(body, "text/html; charset=utf-8");
			//messageBodyPart.attachFile(signaturePath);

			

			// Set text message part
			multipart.addBodyPart(messageBodyPart);
			
			messageBodyPart = new MimeBodyPart();
			FileDataSource ds = new FileDataSource(signatureImagePath);
			
			messageBodyPart.setDataHandler(new DataHandler(ds));
	        messageBodyPart.setHeader("Content-ID","<imageimza>");
	        messageBodyPart.setFileName("imza.png");
	        multipart.addBodyPart(messageBodyPart);
	        
	        messageBodyPart = new MimeBodyPart();
			ds = new FileDataSource(clearImagePath);
			
			messageBodyPart.setDataHandler(new DataHandler(ds));
	        messageBodyPart.setHeader("Content-ID","<clear>");
	        messageBodyPart.setFileName("cleardot.gif");
	        multipart.addBodyPart(messageBodyPart);

			// Part two is attachment
			messageBodyPart = new MimeBodyPart();
			//String excel = this.getClass().getClassLoader().getResource("data/form.xls").getPath();
			//String excel = basePath + "form.xls";
			String filename = "";
			try {
				// filename = excel2pdf(excel);
				filename = createServiceForm(form);
			} catch (Exception e) {
				e.printStackTrace();
			}
			DataSource source = new FileDataSource(filename);
			messageBodyPart.setDataHandler(new DataHandler(source));
			messageBodyPart.setFileName("Teknik Service Formu.pdf");
			multipart.addBodyPart(messageBodyPart);

			// Send the complete message parts
			message.setContent(multipart);

			Transport.send(message);

			return "1";

		} catch (Exception e) {
			return e.getMessage();
		}
	}
	/*
	 * public void sendssl() { Properties props = new Properties();
	 * props.put("mail.smtp.host", "smtp.gmail.com");
	 * props.put("mail.smtp.socketFactory.port", "465");
	 * props.put("mail.smtp.socketFactory.class",
	 * "javax.net.ssl.SSLSocketFactory"); props.put("mail.smtp.auth", "true");
	 * props.put("mail.smtp.port", "465");
	 * 
	 * Session session = Session.getDefaultInstance(props, new
	 * javax.mail.Authenticator() { protected PasswordAuthentication
	 * getPasswordAuthentication() { return new
	 * PasswordAuthentication("sezerdulger@gmail.com","sezdul132466311"); } });
	 * 
	 * try {
	 * 
	 * Message message = new MimeMessage(session); message.setFrom(new
	 * InternetAddress("sezerdulger@gmail.com"));
	 * message.setRecipients(Message.RecipientType.TO,
	 * InternetAddress.parse("erhandulger16@gmail.com")); message.setSubject(
	 * "Testing Subject"); message.setText("Deneme maili");
	 * 
	 * Transport.send(message);
	 * 
	 * System.out.println("Done");
	 * 
	 * } catch (MessagingException e) { throw new RuntimeException(e); } }
	 */

	public String excel2pdf(String excel) throws Exception {
		String path = "C:\\test.pdf";
		FileInputStream input_document = new FileInputStream(new File(excel));
		// Read workbook into HSSFWorkbook
		HSSFWorkbook my_xls_workbook = new HSSFWorkbook(input_document);
		// Read worksheet into HSSFSheet
		HSSFSheet my_worksheet = my_xls_workbook.getSheetAt(0);
		// To iterate over the rows
		// We will create output PDF document objects at this point
		Document iText_xls_2_pdf = new Document();
		PdfWriter.getInstance(iText_xls_2_pdf, new FileOutputStream(path));
		iText_xls_2_pdf.open();
		// we have two columns in the Excel sheet, so we create a PDF table with
		// two columns
		// Note: There are ways to make this dynamic in nature, if you want to.
		PdfPTable my_table = new PdfPTable(7);
		// We will use the object below to dynamically add new data to the table
		PdfPCell table_cell;
		// Loop through rows.
		// Decide which rows to process
		int rowStart = Math.min(0, my_worksheet.getFirstRowNum());
		int rowEnd = Math.max(25, my_worksheet.getLastRowNum());

		for (int rowNum = rowStart; rowNum < rowEnd; rowNum++) {
			Row r = my_worksheet.getRow(rowNum);
			if (r == null) {
				// This whole row is empty
				// Handle it as needed
				continue;
			}

			int lastColumn = Math.max(r.getLastCellNum(), 7);

			for (int cn = 0; cn < lastColumn; cn++) {
				Cell c = r.getCell(cn, Row.RETURN_BLANK_AS_NULL);
				if (c == null) {
					table_cell = new PdfPCell(new Phrase(" "));
					// feel free to move the code below to suit to your needs
					my_table.addCell(table_cell);
				} else {
					table_cell = new PdfPCell(new Phrase(c.getStringCellValue()));
					// feel free to move the code below to suit to your needs
					my_table.addCell(table_cell);
				}
			}
		}
		// Finally add the table to PDF document
		iText_xls_2_pdf.add(my_table);
		iText_xls_2_pdf.close();
		// we created our pdf file..
		input_document.close(); // close xls
		return path;
	}

	public String createServiceForm(ServiceForm form) throws Exception {
		String path = config.temppath + "test.pdf";
		Document document = new Document();
		
		PdfWriter.getInstance(document, new FileOutputStream(path));
		document.open();
		document.setMargins(2, 2, 2, 2);
		// we have two columns in the Excel sheet, so we create a PDF table with
		// two columns
		// Note: There are ways to make this dynamic in nature, if you want to.
		int colNumber = 20;
		PdfPTable my_table = new PdfPTable(colNumber);
		my_table.setWidthPercentage(98);
		// We will use the object below to dynamically add new data to the table
		PdfPCell table_cell;

		int arrayCol = 0;
		int emptyLines1 = 12;
		int emptyLines2 = 12;
		
		
		//String logo = this.getClass().getClassLoader().getResource("data/logo.png").getPath();
		/*
		String address = "PARTEK BİLİŞİM İLETİŞİM ELEKTRONİK TEKNOLOJİ SAN. VE TİC.LTD.ŞTİ.\n";
		address+="Konak Mh. Yıldırım Cd. Karadut Sk. GençArslanlar İş Merkezi No:152\n";
		address+="Kat.3 Daire.42 Nilüfer/BURSA\n";
		address+="info@partekbilisim.com Teknik Servis Tel.(224) 452 53 83";
		*/
		String address = this.address;
		
		ArrayList<FormColSpans> rows = new ArrayList<>();
		rows.add(new FormColSpans(arrayCol, 2, new int[] { 35, 65 }, 
				new Object[] { Image.getInstance(logoPath), address }, new int[]{Element.ALIGN_LEFT, Element.ALIGN_RIGHT}, 7.0f,
				new Border[]{new Border(0, 0, 0, 0), new Border(0, 0, 0, 0)}));
		rows.add(new FormColSpans(arrayCol, 1, new int[] { 100 }, new Object[] { "SERVİS FORMU" }, new int[]{Element.ALIGN_CENTER}));
		rows.add(new FormColSpans(arrayCol, 4, new int[] { 20, 80 },
				new Object[] { "Firma Adı Ünvanı", 
						form.getCustomerTitle() != null ? form.getCustomerTitle() : "" }));
		rows.add(new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 },
				new Object[] { "Departman", form.getDepartment() != null ? form.getDepartment() : "",
						"Talep Tarihi", form.getRequestDate() != null ? form.getRequestDate() : ""}));
		rows.add(new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 }, new Object[] { 
				"Adres", form.getAddress() != null ? form.getAddress() : "", 
				"Hizmet Tarihi", form.getServiceDate() != null ? form.getServiceDate() : "" }));
		rows.add(new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 }, new Object[] { 
				" ", " ", "Hizmet Tipi", 
				form.getServiceType() != null ? form.getServiceType() : ""}));
		rows.add(new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 }, new Object[] { 
				"Telefon", form.getTel() != null ? form.getTel() : "", 
						"Kapsam", 
						form.getScope() != null ? config.translate(form.getScope()) : "" }));
		String emails = "";
		if (form.getEmails() != null) {
			for (int j = 0; j < form.getEmails().size(); j++) {
				emails += form.getEmails().get(j);
				if (j != form.getEmails().size() - 1) {
					emails += ", ";
				}
			}
		}
		rows.add(new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 }, new Object[] { "E-Posta", emails, " ", " " }));
		rows.add(new FormColSpans(arrayCol, 2, new int[] { 60, 40 },
				new Object[] { "TALEP EDİLEN HİZMETİN TANIMI", "KULLANILAN MALZEME" }, new int[]{Element.ALIGN_CENTER, Element.ALIGN_CENTER}));
		
		rows.add(new FormColSpans(arrayCol, 2, new int[] { 60, 40 },
				new Object[] { form.getServiceDefinition() != null ? form.getServiceDefinition() : "", 
						form.getUsedMaterial() != null ? form.getUsedMaterial() : "" }));
		
		for (int i = 1; i < emptyLines1; i++) {
			rows.add(new FormColSpans(i + arrayCol, 2, new int[] { 60, 40 }, new Object[] { " ", " " }));
		}
		arrayCol = emptyLines1 + arrayCol - 1;
		rows.add(new FormColSpans(arrayCol, 1, new int[] { 100 }, new Object[] { 
				"YAPILAN HİZMETİN AÇIKLAMASI" }, new int[]{Element.ALIGN_CENTER}));
		
		rows.add(new FormColSpans(arrayCol, 1, new int[] { 100 }, new Object[] { 
		form.getServiceDescription() != null ? form.getServiceDescription() : "" }));

		for (int i = 1; i < emptyLines2; i++) {
			rows.add(new FormColSpans(i + arrayCol, 1, new int[] { 100 }, new Object[] { " " }));
		}
		arrayCol = emptyLines2 + arrayCol - 3;//TODO 2 means 1 line is written
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.S'Z'");
		Date starttimeDate = getCurrentDate(df.parse(form.getStartTime()));
		Date finishtimeDate = getCurrentDate(df.parse(form.getFinishTime()));
		String hours = "Baslangıç Saati: " + (form.getStartTime() != null ? getTime(starttimeDate.getHours()) + ":" + getTime(starttimeDate.getMinutes()) : "");
		hours += "\nBitiş Saati: " + (form.getFinishTime() != null ? getTime(finishtimeDate.getHours()) + ":" + getTime(finishtimeDate.getMinutes()) : "");
		hours += "\nSüre: " + (form.getDuration() != null ? form.getDuration() : "");
		hours += "\nFiyatlandırma: " + 
		(form.getPricing() != null ? config.translate(form.getPricing()) : "");
		rows.add(new FormColSpans(arrayCol, 4, new int[] { 30, 30, 20, 20 },
				new Object[] { hours, "Hizmeti Veren PARTEK Personeli\n" + (form.getEmployee() != null ? form.getEmployee().getFullname() : "\n\n"), 
						"Firma Kaşe İmza\n\n\n\n\n\n",
						"İlgili Kişi\n\n\n"  + (form.getAuthorizedPerson() != null ? form.getAuthorizedPerson() : "")}));
		rows.add(new FormColSpans(arrayCol, 1, new int[] { 100 }, new Object[] { "İş bu servis formu hizmeti alan tarafından imzalandığında tanımlanan hizmet Partek Personeli tarafından ilgili firmaya verildiği kabul edilmiştir." }));

		for (FormColSpans row : rows) {
			int i = 0;
			for (int j = 0; j < row.items.length; j++) {
				Object item = row.items[j];
			
				table_cell = null;
				if (item == null) {
					BaseFont bf = BaseFont.createFont( BaseFont.TIMES_ROMAN, "Cp857", BaseFont.EMBEDDED );
					Font f1 = new Font(bf, row.size);
					table_cell = new PdfPCell(new Phrase(new Paragraph("", f1)));
				}
				else if (item.getClass().equals(String.class) || item.getClass().equals(Paragraph.class)) {
					BaseFont bf = BaseFont.createFont( BaseFont.TIMES_ROMAN, "Cp857", BaseFont.EMBEDDED );
					Font f1 = new Font(bf, row.size);
					table_cell = new PdfPCell(new Phrase(new Paragraph(item.toString(), f1)));
				}
				else if (item.getClass().equals(com.itextpdf.text.ImgRaw.class)){
					table_cell = new PdfPCell((Image)item, true);
				}
				else if (item.getClass().equals(Date.class)) {
					BaseFont bf = BaseFont.createFont( BaseFont.TIMES_ROMAN, "Cp857", BaseFont.EMBEDDED );
					Font f1 = new Font(bf, row.size);
					SimpleDateFormat dt = new SimpleDateFormat("dd-MM-yyyy");
					table_cell=new PdfPCell(new Phrase(new Paragraph(dt.format(item), f1)));
				}
				table_cell.setColspan(row.colSpans[j] *colNumber / 100);
				table_cell.setHorizontalAlignment(row.aligns[j]);
				table_cell.setPaddingBottom(2.0f);
				if (row.borders != null) {
					table_cell.setBorderWidthLeft(row.borders[j].borderLeftWidth);
					table_cell.setBorderWidthRight(row.borders[j].borderRightWidth);
					table_cell.setBorderWidthTop(row.borders[j].borderTopWidth);
					table_cell.setBorderWidthBottom(row.borders[j].borderBottomWidth);
				}
				my_table.addCell(table_cell);
				++i;
			}
		}

		// Finally add the table to PDF document
		document.add(my_table);
		document.close();
		// we created our pdf file..

		return path;
	}
	
	public String getTime(int time) {
		if (time < 10) {
			return "0" + time;
		}
		return String.valueOf(time);
	}
	
	public Date getCurrentDate(Date d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(d);
		TimeZone currentTimeZone = calendar.getTimeZone();
		long currTime = calendar.getTimeInMillis();
		int offset = currentTimeZone.getOffset(currTime);
		calendar.add(Calendar.MILLISECOND, offset);
		return calendar.getTime();
	}

	
	private class FormColSpans {
		public int itemSize;
		public int rowNumber;
		public int[] colSpans;
		public Object[] items;
		public int[] aligns;
		public float size = 10.0f;
		public Border[] borders = null;

		public FormColSpans(int rowNumber, int itemSize, int[] colSpans, Object[] items, int[] aligns) {
			this(rowNumber, itemSize, colSpans, items);
			this.aligns = aligns;
		}
		
		public FormColSpans(int rowNumber, int itemSize, int[] colSpans, Object[] items) {
			this.rowNumber = rowNumber;
			this.itemSize = itemSize;
			this.colSpans = colSpans;
			this.items = items;
			
			this.aligns = new int[this.items.length];
			
			for (int i = 0; i < items.length; i++) {
				this.aligns[i] = Element.ALIGN_LEFT;
			}
		}
		
		public FormColSpans(int rowNumber, int itemSize, int[] colSpans, Object[] items, int[] aligns, float size) {
			this(rowNumber, itemSize, colSpans, items, aligns);
			this.size = size;
		}
		
		public FormColSpans(int rowNumber, int itemSize, int[] colSpans, Object[] items, int[] aligns, float size, Border[] borders) {
			this(rowNumber, itemSize, colSpans, items, aligns);
			this.size = size;
			this.borders = borders;
		}
	}
	
	private class Border {
		public int borderLeftWidth = 1;
		public int borderRightWidth = 1;
		public int borderTopWidth = 1;
		public int borderBottomWidth = 1;
		
		public BorderTopStyle borderLeftStyle = BorderTopStyle.SOLID;
		public BorderTopStyle borderRightStyle = BorderTopStyle.SOLID;
		public BorderTopStyle borderTopStyle = BorderTopStyle.SOLID;
		public BorderTopStyle borderBottomStyle = BorderTopStyle.SOLID;
		
		public Border() {
			
		}
		
		public Border(int borderLeftWidth, int borderRightWidth, int borderTopWidth, int borderBottomWidth) {
			this.borderLeftWidth = borderLeftWidth;
			this.borderRightWidth = borderRightWidth;
			this.borderTopWidth = borderTopWidth;
			this.borderBottomWidth = borderBottomWidth;
		}
		
		public Border(BorderTopStyle borderLeftStyle, BorderTopStyle borderRightStyle, BorderTopStyle borderTopStyle, BorderTopStyle borderBottomStyle) {
			this.borderLeftStyle = borderLeftStyle;
			this.borderRightStyle = borderRightStyle;
			this.borderTopStyle = borderTopStyle;
			this.borderBottomStyle = borderBottomStyle;
		}
		public Border(int borderLeftWidth, int borderRightWidth, int borderTopWidth, int borderBottomWidth, BorderTopStyle borderLeftStyle, BorderTopStyle borderRightStyle, BorderTopStyle borderTopStyle, BorderTopStyle borderBottomStyle) {
			this(borderLeftWidth, borderRightWidth, borderTopWidth, borderBottomWidth);
			this.borderLeftStyle = borderLeftStyle;
			this.borderRightStyle = borderRightStyle;
			this.borderTopStyle = borderTopStyle;
			this.borderBottomStyle = borderBottomStyle;
		}
	}
}
