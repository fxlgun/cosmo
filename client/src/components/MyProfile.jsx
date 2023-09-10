import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip, { chipClasses } from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import DropZone from "./DropZone";
import FileUpload from "./FileUpload";
import CountrySelector from "./CountrySelector";
import EditorToolbar from "./EditorToolbar";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function MyProfile({ deets }) {
  return (
    <Box
      sx={{
        flex: 1,
        maxWidth: 1200,
        width: "100%",
        mt: "60px",
      }}
    >
      <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
        My Profile
      </Typography>
      <Tabs defaultValue={0} sx={{ bgcolor: "transparent" }}>
        <Box
          sx={{
            "--_shadow-height": "16px",
            height: 0,
            position: "sticky",
            top: "calc(48px - var(--main-paddingTop, 0px) + var(--Header-height, 0px) - (var(--_shadow-height) / 2))",
            zIndex: 1,
            "&::before": {
              content: '""',
              display: "block",
              position: "relative",
              zIndex: 1,
              height: "var(--_shadow-height)",
              background:
                "radial-gradient(closest-side, rgba(0 0 0 / 0.12), transparent 100%)",
            },
          }}
        />

        <Box
          sx={{
            pt: 3,
            pb: 10,
            display: "grid",
            gridTemplateColumns: {
              xs: "100%",
              sm: "minmax(120px, 30%) 1fr",
              lg: "280px 1fr minmax(120px, 208px)",
            },
            columnGap: { xs: 2, sm: 3, md: 4 },
            rowGap: { xs: 2, sm: 2.5 },
            "& > hr": {
              gridColumn: "1/-1",
            },
          }}
        >
          <FormLabel sx={{ display: { xs: "none", sm: "block" } }}>
            Name
          </FormLabel>
          <Box sx={{ display: { xs: "contents", sm: "flex" }, gap: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel sx={{ display: { sm: "none" } }}>First name</FormLabel>
              <Input placeholder="first name" defaultValue={deets.firstName} />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel sx={{ display: { sm: "none" } }}>Last name</FormLabel>
              <Input placeholder="last name" defaultValue={deets.lastName} />
            </FormControl>
          </Box>
          <Divider role="presentation" />
          <FormControl sx={{ display: { sm: "contents" } }}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              startDecorator={<EmailOutlinedIcon />}
              placeholder="email"
              defaultValue={deets.email}
            />
          </FormControl>
          <Divider role="presentation" />
          <div>
            <FormLabel>Your photo</FormLabel>
            <FormHelperText>
              This will be displayed on your profile.
            </FormHelperText>
          </div>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2.5,
            }}
          >
            <Avatar
              size="lg"
              src="/static/images/avatar/1.jpg"
              sx={{ "--Avatar-size": "64px" }}
            />
            <DropZone />
          </Box>
          <Divider role="presentation" />
          <FormControl sx={{ display: { sm: "contents" } }}>
            <FormLabel>Role</FormLabel>
            <Input defaultValue="" />
          </FormControl>
          <Divider role="presentation" />

          <FormControl sx={{ display: { sm: "contents" } }}>
            <FormLabel>Type</FormLabel>
            <Select defaultValue={deets.type}>
              <Option value="aspirant">Aspirant</Option>
              <Option value="studyingAbroad">Studying Abroad</Option>
              <Option value="workingAbroad">Working Abroad</Option>
            </Select>
          </FormControl>
          <Divider role="presentation" />
          <div>
            <FormLabel>Bio</FormLabel>
            <FormHelperText>Write a short introduction.</FormHelperText>
          </div>
          <div>
            <EditorToolbar />
            <Textarea
              minRows={4}
              sx={{ mt: 0 }}
              defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
              275 characters left
            </FormHelperText>
          </div>
          <Divider role="presentation" />
          <Box
            sx={{
              gridColumn: "1/-1",
              justifySelf: "flex-end",
              display: "flex",
              gap: 1,
            }}
          >
            <Button variant="outlined" color="neutral" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </Box>
        </Box>
      </Tabs>
    </Box>
  );
}
