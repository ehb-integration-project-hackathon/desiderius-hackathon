package be.ehb.rabbitmqbroker.validator;

import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.IOException;
import java.io.StringReader;
import java.util.Objects;

public class ValidateXML {
    public boolean validateXml(String xml, String xsdPath) {
        try {
            SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = factory.newSchema(new StreamSource(Objects.requireNonNull(getClass().getClassLoader().getResource(xsdPath)).toString()));
            Validator validator = schema.newValidator();
            validator.validate(new StreamSource(new StringReader(xml)));
            return true; // XML is valid
        } catch (SAXException | IOException e) {
            e.printStackTrace();
            return false; // XML is invalid
        }
    }
}
