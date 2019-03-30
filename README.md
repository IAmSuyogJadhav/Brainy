<div>
<img src="assets/icon.png" align="left" style="margin: 10 10 10 10;" height="150px">
	<h1>Brainy</h1>
<blockquote>The virtual MRI Analyzer</blockquote>
</div>
<br />

<hr />

> [Installation Instructions](#Installation-Instructions) towards the end.

# Project Overview

<div>
    <img src="./assets/brain.png" align="left" style="margin: 10 10 10 10;" width='500'>
    <p>
        MRI is a very popular technique to detect tumours. MRI creates cross-section pictures of your insides. But MRI uses strong magnets to make the images – not radiation. An MRI scan takes cross-sectional slices (views) from many angles, as if someone were looking at a slice of your body from the front, from the side, or from above your head. 
MRI creates pictures of soft tissue parts of the body that are sometimes hard to see using other imaging tests.MRI is very good at finding and pinpointing some cancers. An MRI with contrast dye is the best way to see brain and spinal cord tumors.
    </p>
</div>

## Why this Project

> With a surge in the brain related ailments in the world, every year over 2,500 of the Indian children suffer from medulloblastoma, a pediatric malignant primary brain tumour which spreads through the cerebrospinal fluid (CSF) and frequently metastasize to different locations along the surface of the brain and spinal cord, doctors have said.
>
> According to them, in India, every year 40,000-50,000 persons are diagnosed with brain tumour. Of these 20 per cent are children. Until a year ago, the figure was only somewhere around 5 per cent.
>
> The doctors said that if the cases are detected early, then 90 per cent of the tumour cases are curable, provided the treatment protocol is followed correctly.

<div align="right"><blockquote><i>-Source (“The Hindu “)</i></blockquote></div>

- Though the technology used in MRI seems to be quite technically advanced, for the detection of tumour in the MRI image, currently we mostly rely on human skill and expertise. 

- Although this method proves to be accurate in most of the cases, it sometimes fails when the human eye fails to detect tiny irregularities 
- In a country like India, there is a lack of skilled Oncologists and Neurologists present.

- According to a report in 2018 , the country is facing a severe shortage of care-givers with merely 2000 Oncologists to look after around 10 Million patients. 

- The condition is much more worse in the rural areas where the count of Oncologists is much less.

## Proposed Solution

> *Jump directly to the training notebook by clicking **[here](training.ipynb)***

​	In order to solve this problem, we propose Brainy, our Brain MRI segmentation tool. Not only would Brainy automatise the entire process of diagnosis for tumours , but it would also help in solving out those cases which are generally missed by the human eye. 

#### About the Dataset

​	The data that we’ve used is the BRATS dataset. This dataset contains the segmented images of the brain tissues. After the image has been segmented, there are 5 classes namely Necrosis, Edema , Non-Enhancing tumour , Enhancing  tumour and the background. There are about 220 images in the training dataset.

#### The Model

<div>
      <img src="./assets/model-pipeline.png", align="right" width='400'><br />
      <p>
            To segment the brain MRI’s we use a popular network called <b>U-Net</b>.
The U-Net architecture is built upon the Fully Convolutional Network and modified in a way that it yields better segmentation in medical imaging. Compared to FCN-8, the two main differences are: <br /><br />
            <b>1.</b> U-net is symmetric and <br />
            <b>2.</b> The skip connections between the downsampling path and the upsampling path apply a concatenation operator instead of a sum. <br /><br />
These skip connections intend to provide local information to the global information while upsampling. Because of its symmetry, the network has a large number of feature maps in the upsampling path, which allows to transfer information. By comparison, the basic FCN architecture only had number of classes feature maps in its upsampling path. 
        </p>
</div>
<div>
        <img src="./assets/unet.jpg" align="left" style="margin: 10 10 10 10;" width='400'><br /><center><b>The U-Net Model</b></center>
        	<br /><br /><br /></b>The U-Net owes its name to its symmetric shape, which is different from other FCN variants. U-Net architecture is separated in 3 parts:<br /><br />
            <b>1.</b> The contracting/downsampling path <br />
            <b>2.</b> Bottleneck <br />
        	<b>3.</b> The expanding/upsampling path <br /><br />
	</p>
</div>

#### Metrics

<div>  
<img src="./assets/metric.png" align="right" style="margin:10 10 10 10;" width='200'><br />
<p>
        To quantify the performance of our image segmentation, <b>Dice Score</b> is used. The algorithm is validated by calculating the Dice score, which is a measure of how similar the objects are. So it is the size of the overlap of the two segmentations divided by the total size of the two objects. That is, the score for a particular class c is the size of the overlap between the predicted region and its true counterpart. We were able to achieve best coefficient of dice loss score <b>0.43</b> (higher the better).
</p>
</div> 

# Preview
<div>
<img src="assets/analyze.png" align="centre" width="500px" style="margin: 10 10 10 10;"><br />
	<p align="center"><b>A screenshot of the project interface</b></p>
</div>

# Installation Instructions

> **Please note that the project is NOT yet completely ready to launch, and will probably fail to run on your PC.**

Though the model currently is far from state-of-the-art accuracy, rest of the things should work fine. You can try running the project on your local environment by following the steps below:

1. Clone this repository

   ```bash
   git clone https://github.com/IAmSuyogJadhav/Brainy.git
   ```

   or [Download](https://github.com/IAmSuyogJadhav/Brainy/archive/master.zip) and then extract its contents.

2. Change to the root folder of repository and run following commands in the terminal:

   ```bash
   sudo apt-get install python3 -y
   sudo apt-get install python3-pip -y
   pip3 install -r requirements.txt
   ```

3. Now start the flask server using following command:

   ```bash
   flask run
   ```

   It may take a while. 

4. Now open your browser and navigate to http://localhost:5000. Click on **New User?** and register yourself (Don't worry, there's no cloud based database. Your credentials are just being stored locally. Feel free to use fake data.).

5. Upload a `.mha` image using the uploader GUI (you won't need internet for this), choose it from the dropdown menu to analyze the results. This last part is currently under work.

   > You might get an error 
   >
   > `Tensor Tensor("activation_143/Sigmoid:0", shape=(?, 1, 120, 120, 120), dtype=float32) is not an element of this graph.` 
   >
   > We are investigating this and currently there's no fix for this.

# Team

| <a href="http://github.com/gktejus" target="_blank"><img src="assets/Gk.png" height="150px"></a> | <a href="http://github.com/IAmSuyogJadhav" target="_blank"><img src="assets/Suyog.png" height="150px"></a> | <a href="http://github.com/ubamba98" target="_blank"><img src="assets/Udbhav.png" height="150px"></a> |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|            [Gk Tejus](http://github.com/gktejus)             | [Suyog Jadhav](http://github.com/IAmSuyogJadhav) | [Udbhav Bamba](http://github.com/ubamba98) |

---

# References

- Brain Tumor Segmentation with Deep Neural Networks (<https://arxiv.org/pdf/1505.03540.pdf>)
- Generalised Dice overlap as a deep learning loss function for highly unbalanced segmentations (<https://arxiv.org/abs/1707.03237>)
- U-Net: Convolutional Networks for Biomedical Image Segmentation (<https://arxiv.org/pdf/1505.04597.pdf>)
- An Open Source Implementation of 3D-Unet (<https://github.com/96imranahmed/3D-Unet>)
- BRATS 2015 Dataset (<https://www.med.upenn.edu/>)

---

> This project was made as part of the **TCS PanIIT Conclave 2019 - Mission AI: Solve for India**, a 24 hour hackathon organised at IIT Delhi, India on 19th-20th January by the PanIIT organisation, Skillenza and TCS. Our project achieved 4th rank at the same.

# Notebook

The training notebook can be accessed below:

<a href="https://colab.research.google.com/github/IAmSuyogJadhav/Brainy/blob/master/training.ipynb" target="_blank"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

# Contributing
This project holds huge potential and is still a work in progress. If you'd like to contribute, please [drop me a mail](mailto:me@suyogjadhav.com). Needn't be anything formal, even a "Hello, wanted to contribute to Brainy." would more than suffice :p. I have a couple of things on my mind right now. We can discuss and start working accordingly.

I will be adding a few instructions to get started in the _[wiki](https://github.com/IAmSuyogJadhav/Brainy/wiki)_ tab shortly.

# Updates
- **30-03-2019**: Completed a step of preprocessing namely, _N4 Bias Correction_. The code has been uploaded in a jupyter notebook (see [Preprocessing.ipynb](Preprocessing.ipynb))
- **29-03-2019**: Added code for Building ANTS from source, for Colab. An article containing links to pre-built ANTs binaries built specifically for Google Colab and how to install it is also up on my blog ([read here](https://www.suyogjadhav.com/misc/2019/03/28/Using-ANTs-package-on-Google-Colaboratory/)).
