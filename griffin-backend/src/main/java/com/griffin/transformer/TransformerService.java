package com.griffin.transformer;

import com.griffin.collector.Project;
import com.griffin.collector.Repo;
import com.griffin.collector.bitbucket.BitbucketRepo;
import com.griffin.insightsdb.model.RepositorySnapShot;
import com.griffin.insightsdb.service.InsightDBService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Service
public class TransformerService {
    private static final Logger log = LoggerFactory.getLogger(TransformerService.class);
    private final InsightDBService insightDBService;

    public TransformerService(InsightDBService insightDBService) {
        this.insightDBService = insightDBService;
    }

    public void transform(List<Project> projects) {
        for(Project project : projects) {
            HashMap<String, BitbucketRepo> repositories = project.getRepoHashMap();

            for(Repo repo : repositories.values()) {
                List<File> buildFiles = repo.getBuildFiles();

                for(File buildFile : buildFiles) {
                    String fileType = getFileExtension(buildFile.getName());
                    String projectName = "";
                    List<String> dependencies = null;

                    if (fileType.equals(".xml")) {
                        log.info(repo + " : Maven found");
                        projectName = ReadXML.parseProjectName(buildFile);
                        dependencies = ReadXML.parseDependencies(buildFile);
                        insightDBService.UpdateProject("8.8.8.8", "bitbucket", projectName, dependencies, project.getKey());

                    } else if (fileType.equals(".gradle")) {
                        log.info(repo.toString() + " : Gradle found");
                        // Below code causes ArrayIndexOutOfBoundsException
                        projectName = ReadGradle.parseProjectName(buildFile);
                        dependencies = ReadGradle.parseDependencies(buildFile);
                    } else {
                        log.error("\"" + buildFile.getName() + "\", " + fileType + " - Invalid build file extension");
                    }


                }
            }
        }
    }

    private String getFileExtension(String fileName) {
        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return fileName.substring(lastIndexOf);
    }
}
